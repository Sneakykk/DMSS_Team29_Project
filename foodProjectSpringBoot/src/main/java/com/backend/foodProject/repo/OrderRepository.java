package com.backend.foodProject.repo;


import com.backend.foodProject.entity.Order;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.time.LocalDateTime;
import java.sql.Timestamp;




@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    // @Modifying
    // @Transactional
    // @Query(value = "INSERT INTO orders (OrderID, EmployeeID, ItemName, TimeOfOrder, TotalBill, Quantity) VALUES (?1, ?2, ?3, ?4, ?5, ?6)", nativeQuery = true)
    // void insertOrder(int orderId, int employeeId, String itemName, Timestamp timeOfOrder, float totalBill, String quantity);

    List<Order> findByEmployeeIdAndTimeOfOrderBetween(int employeeId, Timestamp startDate, Timestamp endDate );
    
    List<Order> findByEmployeeId(int employeeId);

    List<Order> findByTimeOfOrderBetween(Timestamp startDate, Timestamp endDate);

    @Query("SELECT o FROM Order o WHERE o.orderStatus <> 'Completed'")
    List<Order> findOrdersByOrderStatusNotCompleted();

    List<Order> findByEmployeeIdAndOrderStatusNotOrderByTimeOfOrderDesc(int employeeId, String orderStatus);

}
