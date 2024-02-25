package com.projectgogetfood;

public class Main {
    public static void main(String[] args) {
        ConnectToDatabase db = new ConnectToDatabase();
        db.connect();
    }
}