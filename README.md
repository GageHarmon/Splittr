# Splittr

Splittr is an application that allows users to easily manage expenses after a night out with friends. Users can sign up, login, logout, create bills, and split bills into items, assigning the items to the users who need to pay for them.

## Technologies

- Typescript
- Python
- Next.js
- Tailwind CSS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- Python 3
- Pipenv

### Installing

Clone the repository:
git clone https://github.com/your-username/Splittr.git

Navigate to the `Splittr` folder:
cd Splittr

#### Frontend setup

Navigate to the `splittr` folder:
cd splittr

Install dependencies:
npm install

Run the development server:
npm run dev

#### Backend setup

Navigate to the `server` folder:
cd ../server

Install dependencies:
pipenv install

Activate the virtual environment:
pipenv shell

Run the Flask server:
flask run

## Application Structure

Splittr is built using a modular structure. The main components of the application are:

- `index`: Handles user login and signup functionality.
- `Home`: Displays the welcome message and renders the footer with navigation.
- `Groups`: Displays groups, allows users to create new bills, and assign items to users.
- `Activity`: Displays the user's bills and allows them to pay the bills.
- `Account`: Displays the items in each bill associated with the user.
- `Header`: Contains the title and logout functionality.
- `Footer`: Contains the application's navigation links.

Each component is contained in its own file, making it easier to maintain and update the application as needed.

The application also includes several tables to manage its data:

- `users`: Stores user data.
- `bills`: Stores bill data.
- `items`: Stores item data.
- `bill_users`: Many-to-many relationship between users and bills.
- `bill_items`: Many-to-many relationship between bills and items.

## Authors

- Gage Harmon & Dylan Abbott

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
