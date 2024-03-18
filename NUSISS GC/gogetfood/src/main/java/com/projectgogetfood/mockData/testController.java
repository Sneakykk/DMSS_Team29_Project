import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/api/menu/get_all_food")
    public FullMenu getData() {
        private final List<FoodItem> mockFoodItems;

        public FoodController() {
            this.mockFoodItems = MockData.getMockFoodItems();
        }

        @GetMapping
        public List<FoodItem> getAllFoodItems() {
            return mockFoodItems;
        }
    }
}