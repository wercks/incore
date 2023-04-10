/**
 * @author Wercks de Oliveira <wercks@live.com>
 */
export declare class IncorePagination {
    protected _previous: number;
    protected _next: number;
    protected last: number;
    protected currentPageNumber: number;
    protected itemCountPerPage: number;
    protected totalPages: number;
    protected _pages: number[];
    protected pageCount: number;
    protected itemsCount: number;
    constructor(itemsCount: number, currentPageNumber?: number, totalPages?: number, itemCountPerPage?: number);
    get previous(): number;
    get next(): number;
    get pages(): number[];
    protected paginate(): number[];
    get count(): number;
    protected calculatePageCount(): number;
    normalizePageNumber(number: number): number;
    set setTotalPages(total_pages: number);
    set setItemCountPerPage(itemCountPerPage: number);
    get getItemCountPerPage(): number;
    set setCurrentPageNumber(pageNumber: number);
    get getCurrentPageNumber(): number;
    recreate(): void;
}
