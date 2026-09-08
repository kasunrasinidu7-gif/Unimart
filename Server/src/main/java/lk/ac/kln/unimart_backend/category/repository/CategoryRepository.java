package lk.ac.kln.unimart_backend.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
