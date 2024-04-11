package com.backend.foodProject;

import com.backend.foodProject.Service.*;
import com.backend.foodProject.entity.*;
import com.backend.foodProject.repo.*;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class FoodProjectRepositoryTests {

	@Mock
	private FoodRepository foodRepository;

	private FoodService foodService;

	@Mock
	private OrderRepository orderRepository;

	private OrderService orderService;


	@Mock
	private StoreRepository storeRepository;

	private StoreService storeService;

	@Mock
	private UserRepository userRepository;

	private UserService userService;

	@BeforeEach
	public void setUp() {
		Food food = new Food(1, 1, "burger", 10.00F, "food");

		List<Food> foodList = new ArrayList<>();
		foodList.add(food);

		User user = new User(1, "test", "test", "test", "test", 1);
		List<User> users = new ArrayList<>();
		users.add(user);
		
		Order order = new Order(1, 1, "burger", Timestamp.valueOf(LocalDateTime.now()), 10.00f, "1");
		ArrayList<Order> orders = new ArrayList<>();
		orders.add(order);

		Store store = new Store();
		store.setStoreName("test");
		store.setStoreId(1);

		ArrayList<Store> stores = new ArrayList<>();
		stores.add(store);

		MockitoAnnotations.initMocks(this);
		foodService = new FoodService(foodRepository);
		orderService = new OrderService(orderRepository);
		storeService = new StoreService(storeRepository);
		userService = new UserService(userRepository);

		Mockito.when(foodRepository.findById(food.getItemId()))
				.thenReturn(Optional.of(food));
		Mockito.when(foodRepository.findAll())
				.thenReturn(foodList);

		Mockito.when(userRepository.findById(user.getEmployeeId()))
				.thenReturn(Optional.of(user));
		Mockito.when(userRepository.findAll())
				.thenReturn(users);

		Mockito.when(orderRepository.findAll())
				.thenReturn(orders);

		Mockito.when(storeRepository.findById(store.getStoreId()))
				.thenReturn(Optional.of(store));
		Mockito.when(storeRepository.findAll())
				.thenReturn(stores);

	}

	@Test
	public void testGetAllFoods() {
		List<Food> foodList = Arrays.asList(new Food(), new Food());
		when(foodRepository.findAll()).thenReturn(foodList);
		assertEquals(foodList, foodService.getAllFoods());
	}

	@Test
	public void testGetFoodById() {
		int id = 1;
		Food food = new Food();
		when(foodRepository.findById(id)).thenReturn(Optional.of(food));
		assertEquals(food, foodService.getFoodById(id));
	}

	// @Test
	// public void testGetFoodItemsByStoreId() {
	// 	int storeId = 1;
	// 	List<Food> foodList = Arrays.asList(new Food(), new Food());
	// 	when(foodRepository.findByStoreId(storeId)).thenReturn(foodList);
	// 	assertEquals(foodList, foodService.getFoodItemsByStoreId(storeId));
	// }

	@Test
	public void testCreateFood() {
		Food food = new Food();
		when(foodRepository.save(food)).thenReturn(food);
		assertEquals(food, foodService.createFood(food));
	}

	@Test
	public void testUpdateFood() {
		int id = 1;
		Food food = new Food();
		when(foodRepository.existsById(id)).thenReturn(true);
		when(foodRepository.save(food)).thenReturn(food);
		assertEquals(food, foodService.updateFood(id, food));
	}

	@Test
	public void testUpdateFoodNotFound() {
		int id = 1;
		Food food = new Food();
		when(foodRepository.existsById(id)).thenReturn(false);
		assertThrows(EntityNotFoundException.class, () -> foodService.updateFood(id, food));
	}

	@Test
	public void testDeleteFood() {
		int id = 1;
		when(foodRepository.existsById(id)).thenReturn(true);
		assertDoesNotThrow(() -> foodService.deleteFood(id));
		verify(foodRepository, times(1)).deleteById(id);
	}

	@Test
	public void testDeleteFoodNotFound() {
		int id = 1;
		when(foodRepository.existsById(id)).thenReturn(false);
		assertThrows(EntityNotFoundException.class, () -> foodService.deleteFood(id));
	}

	@Test
	public void testGetAllOrders() {
		List<Order> orderList = Arrays.asList(new Order(), new Order());
		when(orderRepository.findAll()).thenReturn(orderList);
		assertEquals(orderList, orderService.getAllOrders());
	}

	@Test
	public void testAddStore() {
		Store store = new Store();
		when(storeRepository.save(store)).thenReturn(store);
		assertEquals(store, storeService.addStore(store));
	}

	@Test
	public void testGetAllStores() {
		List<Store> storeList = Arrays.asList(new Store(), new Store());
		when(storeRepository.findAll()).thenReturn(storeList);
		assertEquals(storeList, storeService.getAllStores());
	}

	@Test
	public void testFindStoreById() {
		int id = 1;
		Store store = new Store();
		when(storeRepository.findById(id)).thenReturn(Optional.of(store));
		assertEquals(Optional.of(store), storeService.findStoreById(id));
	}


	@Test
	public void testGetAllUsers() {
		List<User> userList = Arrays.asList(new User(), new User());
		when(userRepository.findAll()).thenReturn(userList);
		assertEquals(userList, userService.getAllUsers());
	}

	@Test
	public void testGetUserById() {
		int id = 1;
		User user = new User();
		when(userRepository.findById(id)).thenReturn(Optional.of(user));
		assertEquals(user, userService.getUserById(id));
	}

	@Test
	public void testCreateUser() {
		User user = new User();
		when(userRepository.save(user)).thenReturn(user);
		assertEquals(user, userService.createUser(user));
	}

	@Test
	public void testUpdateUser() {
		int id = 1;
		User user = new User();
		when(userRepository.existsById(id)).thenReturn(true);
		when(userRepository.save(user)).thenReturn(user);
		assertEquals(user, userService.updateUser(id, user));
	}

	@Test
	public void testUpdateUserNotFound() {
		int id = 1;
		User user = new User();
		when(userRepository.existsById(id)).thenReturn(false);
		assertThrows(EntityNotFoundException.class, () -> userService.updateUser(id, user));
	}

	@Test
	public void testDeleteUser() {
		int id = 1;
		when(userRepository.existsById(id)).thenReturn(true);
		assertDoesNotThrow(() -> userService.deleteUser(id));
		verify(userRepository, times(1)).deleteById(id);
	}

	@Test
	public void testDeleteUserNotFound() {
		int id = 1;
		when(userRepository.existsById(id)).thenReturn(false);
		assertThrows(EntityNotFoundException.class, () -> userService.deleteUser(id));
	}

}
