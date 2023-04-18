import React, { useState, useEffect } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function User({ users, userId, bills }) {
  const [user, setUser] = useState({});
  const [userBills, setUserBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  useEffect(() => {
    if (users) {
      setUser(users.find(u => u.id === userId) || {});
    }
  }, [users, userId]);

  useEffect(() => {
    if (user && bills) {
      const userBills = bills.filter(bill => bill.user_id === userId);
      setUserBills(userBills);
    }
  }, [bills, user, userId]);

  // const stripe = useStripe();
  // const elements = useElements();

  const handlePay = async () => {
    setIsPaying(true);
    setPaymentError(null);
    setPaymentSuccess(false);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setPaymentError(error.message);
      setIsPaying(false);
    } else {
      console.log(paymentMethod);

      const selectedBillId = selectedBill.id;
      const response = await fetch('/api/pay-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedBillId,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const { error, success } = await response.json();

      if (error) {
        console.error(error);
        setPaymentError(error.message);
      } else {
        console.log(success);
        setPaymentSuccess(true);
        setSelectedBill(null);
      }

      setIsPaying(false);
    }
  };

  return (
    <div>
      <h1>Hello, {user.username}!</h1>
      <h2>{user.username}'s Bills:</h2>
      <ul>
        {userBills.map(bill => (
          <li key={bill.id}>
            {bill.description}: {bill.amount}
            <button disabled={isPaying} onClick={() => setSelectedBill(bill)}>
              Pay Now
            </button>
          </li>
        ))}
      </ul>
      {selectedBill && (
        <div>
          <h3>Pay {selectedBill.description}</h3>
          <Elements stripe={stripePromise}>
            <form onSubmit={handlePay}>
              <label>
                Card details
                <CardElement />
              </label>
              <button type="submit" disabled={isPaying}>
                {isPaying ? 'Paying...' : 'Pay Now'}
              </button>
              {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
              {paymentSuccess && <p style={{ color: 'green' }}>Payment successful!</p>}
            </form>
          </Elements>
        </div>
      )}

    </div>
  );
}

