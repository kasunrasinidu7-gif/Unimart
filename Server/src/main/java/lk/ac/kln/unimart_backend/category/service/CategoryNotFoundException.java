package lk.ac.kln.unimart_backend.category.service;

public class CategoryNotFoundException extends RuntimeException {

    public CategoryNotFoundException(Long id) {
        super("Category not found with id: " + id);
    }
}
