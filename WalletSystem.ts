import readline from "readline";

class User {
  username: string;
  balance: number;

  constructor(username: string) {
    this.username = username;
    this.balance = 0;
  }
}

class Transaction {
  type: "topup" | "transfer";
  from: string;
  to: string;
  amount: number;
  timestamp: Date;

  constructor(
    type: "topup" | "transfer",
    from: string,
    to: string,
    amount: number
  ) {
    this.type = type;
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.timestamp = new Date();
  }
}

class WalletSystem {
  private users: Record<string, User> = {};
  private transactions: Transaction[] = [];

  registerUser(username: string): void {
    if (this.users[username]) {
      console.log("User already exists.");
    } else {
      this.users[username] = new User(username);
      console.log(`User '${username}' registered successfully.`);
    }
  }

  topUp(username: string, amount: number): void {
    const user = this.users[username];
    if (!user) {
      console.log("User not found.");
      return;
    }
    user.balance += amount;
    this.transactions.push(
      new Transaction("topup", username, username, amount)
    );
    console.log(`Wallet topped up by ${amount} units.`);
  }

  checkBalance(username: string): void {
    const user = this.users[username];
    if (!user) {
      console.log("User not found.");
      return;
    }
    console.log(`Balance for '${username}': ${user.balance} units.`);
  }

  transferMoney(
    fromUsername: string,
    toUsername: string,
    amount: number
  ): void {
    const fromUser = this.users[fromUsername];
    const toUser = this.users[toUsername];

    if (!fromUser || !toUser) {
      console.log("Sender or receiver not found.");
      return;
    }
    if (fromUser.balance < amount) {
      console.log("Insufficient balance.");
      return;
    }

    fromUser.balance -= amount;
    toUser.balance += amount;
    this.transactions.push(
      new Transaction("transfer", fromUsername, toUsername, amount)
    );
    console.log(
      `Transferred ${amount} units from '${fromUsername}' to '${toUsername}'.`
    );
  }

  viewAllTransactions(): void {
    if (this.transactions.length === 0) {
      console.log("No transactions found.");
      return;
    }
    console.log("All Transactions:");
    this.transactions.forEach((tx, idx) => {
      console.log(
        `${
          idx + 1
        }. [${tx.timestamp.toLocaleString()}] ${tx.type.toUpperCase()} - From: ${
          tx.from
        }, To: ${tx.to}, Amount: ${tx.amount}`
      );
    });
  }

  viewUserTransactions(username: string): void {
    const userTx = this.transactions.filter(
      (tx) => tx.from === username || tx.to === username
    );
    if (userTx.length === 0) {
      console.log("No transactions found for this user.");
      return;
    }
    console.log(`Transactions for '${username}':`);
    userTx.forEach((tx, idx) => {
      console.log(
        `${
          idx + 1
        }. [${tx.timestamp.toLocaleString()}] ${tx.type.toUpperCase()} - From: ${
          tx.from
        }, To: ${tx.to}, Amount: ${tx.amount}`
      );
    });
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const wallet = new WalletSystem();

function showMenu(): void {
  console.log("\n--- Digital Wallet System ---");
  console.log("1. Register a user");
  console.log("2. Top up money into your digital wallet");
  console.log("3. Transfer Money to another wallet on the same system");
  console.log("4. Check balance");
  console.log("5. Check all transactions in the system");
  console.log("6. Check all transactions that a user has been a part of");
  console.log("7. Exit");

  rl.question("Please choose an option: ", (answer: string) => {
    handleMenu(answer);
  });
}

function handleMenu(option: string): void {
  switch (option) {
    case "1":
      rl.question("Enter username to register: ", (username) => {
        wallet.registerUser(username);
        showMenu();
      });
      break;

    case "2":
      rl.question("Enter your username: ", (username) => {
        rl.question("Enter amount to top up: ", (amount) => {
          wallet.topUp(username, parseFloat(amount));
          showMenu();
        });
      });
      break;

    case "3":
      rl.question("Enter your username: ", (fromUsername) => {
        rl.question("Enter recipient username: ", (toUsername) => {
          rl.question("Enter amount to transfer: ", (amount) => {
            wallet.transferMoney(fromUsername, toUsername, parseFloat(amount));
            showMenu();
          });
        });
      });
      break;

    case "4":
      rl.question("Enter your username: ", (username) => {
        wallet.checkBalance(username);
        showMenu();
      });
      break;

    case "5":
      wallet.viewAllTransactions();
      showMenu();
      break;

    case "6":
      rl.question("Enter username: ", (username) => {
        wallet.viewUserTransactions(username);
        showMenu();
      });
      break;

    case "7":
      console.log("Thank you for using the Digital Wallet System!");
      rl.close();
      break;

    default:
      console.log("Invalid option. Please try again.");
      showMenu();
  }
}

showMenu();

export { WalletSystem };
