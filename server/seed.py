import random
from faker import Faker
from models import db, Users, Bills, Items, BillItems, BillUsers
from app import app

# create faker instance
fake = Faker()

with app.app_context():
    print("Deleting Users")
    Users.query.delete()
    print("Deleting Bills")
    Bills.query.delete()
    print("Deleting Items")
    Items.query.delete()
    print("Deleting BillItems")
    BillItems.query.delete()
    print("Deleting BillUsers")
    BillUsers.query.delete()

# generate fake users
    users = []
    for i in range(10):
        username = fake.unique.user_name()
        email = fake.email()
        user = Users(username=username, email=email)
        user.password_hash = "test"
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    # generate fake bills
    bills = []
    for i in range(5):
        name = fake.name()
        total_amount = fake.random_int(min=100, max=1000)
        user_id = random.choice(users).id
        print(user_id)
        bill = Bills(total_amount=total_amount,
                     user_id=user_id)
        bills.append(bill)
    db.session.add_all(bills)
    db.session.commit()

    # generate fake items
    items = []
    for i in range(20):
        title = fake.sentence(nb_words=3, variable_nb_words=True)
        description = fake.paragraph()
        price = fake.random_int(min=10, max=100)
        user_id = random.choice(users).id
        status = random.choice(['balance', 'paid'])
        item = Items(title=title, description=description,
                     price=price, user_id=user_id, status=status)
        items.append(item)

    db.session.add_all(items)
    db.session.commit()

    # generate fake bill_items
    bill_items = []
    for bill in bills:
        items_for_bill = random.sample(items, k=random.randint(1, 5))
        for item in items_for_bill:
            bill_item = BillItems(bill_id=bill.id, item_id=item.id)
            bill_items.append(bill_item)

    db.session.add_all(bill_items)
    db.session.commit()

    # generate fake bill_users
    bill_users = []
    for bill in bills:
        users_for_bill = random.sample(users, k=random.randint(1, 5))
        for user in users_for_bill:
            bill_user = BillUsers(bill_id=bill.id, user_id=user.id)
            bill_users.append(bill_user)

    db.session.add_all(bill_users)
    db.session.commit()

    # add fake data to database
