package lk.ac.kln.unimart_backend.category.service;

public class CategoryAlreadyInactiveException extends RuntimeException {

    public CategoryAlreadyInactiveException(Long id) {
        super("Category is already inactive: " + id);
    }
}
