import { describe, it, expect, beforeEach } from "@jest/globals";
import { WalletSystem } from "./WalletSystem";

let wallet: WalletSystem;

beforeEach(() => {
  wallet = new WalletSystem();
});

describe("WalletSystem", () => {
  it("should register a new user", () => {
    wallet.registerUser("Alice");
    expect((wallet as any).users["Alice"]).toBeDefined();
    expect((wallet as any).users["Alice"].balance).toBe(0);
  });

  it("should top up user balance", () => {
    wallet.registerUser("Bob");
    wallet.topUp("Bob", 100);
    expect((wallet as any).users["Bob"].balance).toBe(100);
  });

  it("should transfer money between users", () => {
    wallet.registerUser("Alice");
    wallet.registerUser("Bob");
    wallet.topUp("Alice", 100);
    wallet.transferMoney("Alice", "Bob", 50);
    expect((wallet as any).users["Alice"].balance).toBe(50);
    expect((wallet as any).users["Bob"].balance).toBe(50);
  });

  it("should not allow transfer with insufficient balance", () => {
    wallet.registerUser("Charlie");
    wallet.registerUser("Dave");
    wallet.topUp("Charlie", 20);
    wallet.transferMoney("Charlie", "Dave", 50);
    expect((wallet as any).users["Charlie"].balance).toBe(20);
    expect((wallet as any).users["Dave"].balance).toBe(0);
  });

  it("should record transactions", () => {
    wallet.registerUser("Eve");
    wallet.topUp("Eve", 200);
    wallet.viewUserTransactions("Eve");
    expect((wallet as any).transactions.length).toBeGreaterThan(0);
  });
});
