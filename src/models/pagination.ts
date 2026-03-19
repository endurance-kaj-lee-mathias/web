export interface Pagination {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
}

export interface Paginated<T> {
    data: T[];
    pagination: Pagination;
}
