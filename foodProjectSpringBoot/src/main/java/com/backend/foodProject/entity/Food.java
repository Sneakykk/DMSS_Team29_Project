package com.backend.foodProject.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "MENU") // Specify the table name here
public class Food {

    @Id
    @Column(name = "ItemID") // Specify the correct column name here
    private Integer itemId;

    @Column(name="StoreID")
    private Integer storeId;
    
    @Column(name = "ItemName") // Correctly map the column name
    private String itemName;

    @Column(name="ItemPrice")
    private float itemPrice;

    @Column(name="Type")
    private String itemType;

    @Transient
    private String[] itemTypeUnqiue;

    @Transient
    private Food[] foodHistory;

    public Food()
    {

    }

    public Food (int itemId, int storeId, String itemName, float itemPrice, String itemType)
    {
        this.itemId = itemId;
        this.itemPrice = itemPrice;
        this.itemName = itemName;
        this.storeId = storeId;
        this.itemType = itemType;
    }

    public float getItemPrice() {
        return itemPrice;
    }

    public int getItemId() {
        return itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public String getItemType(){
        return itemType;
    }

    public int getStoreId(){
        return storeId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setItemPrice(float itemPrice) {
        this.itemPrice = itemPrice;
    }

    public void setItemType(String itemType){
        this.itemType = itemType;
    }

    public void setStoreId(int storeId){
        this.storeId = storeId;
    }

    public String[] getItemTypeUnqiueArr() {
        return itemTypeUnqiue;
    }

    // Setter method for myArray
    public void setItemTypeUnqiueArr(String[] itemTypeUnqiue) {
        this.itemTypeUnqiue = itemTypeUnqiue;
    }

    public Food[] getFoodHistory() {
        return foodHistory;
    }

    // Setter method for myArray
    public void setFoodHistory(Food[] foodHistory) {
        this.foodHistory = foodHistory;
    }
}