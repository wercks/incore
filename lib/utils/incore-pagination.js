"use strict";
/**
 * @author Wercks de Oliveira <wercks@live.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorePagination = void 0;
class IncorePagination {
    constructor(itemsCount, currentPageNumber = 1, totalPages = 5, itemCountPerPage = 10) {
        this._previous = 0;
        this._next = 0;
        this.last = 1;
        this.currentPageNumber = 1;
        this.itemCountPerPage = 10;
        this.totalPages = 5;
        this._pages = [];
        this.pageCount = -1;
        this.itemsCount = 0;
        this.itemsCount = itemsCount;
        this.currentPageNumber = currentPageNumber;
        this.totalPages = totalPages;
        this.itemCountPerPage = itemCountPerPage;
        this.paginate();
    }
    get previous() {
        return this._previous;
    }
    get next() {
        return this._next;
    }
    get pages() {
        return this._pages;
    }
    paginate() {
        this.currentPageNumber = this.normalizePageNumber(this.currentPageNumber);
        this.totalPages = this.normalizePageNumber(this.totalPages);
        this.pageCount = this.count;
        if (this.currentPageNumber - 1 > 0) {
            this._previous = this.currentPageNumber - 1;
        }
        if (this.currentPageNumber + 1 <= this.pageCount) {
            this._next = this.currentPageNumber + 1;
        }
        let x = 0, y = 0;
        if (this.totalPages >= 5) {
            x = 1;
            y = x + this.totalPages - 1;
            let jump = Math.ceil(this.totalPages / 2);
            if (this.currentPageNumber >= jump) {
                x = (this.currentPageNumber - jump / 2) | 0;
                y = x + this.totalPages - 1;
            }
        }
        else {
            x = this.currentPageNumber;
            y = x + this.totalPages - 1;
        }
        if (y >= this.pageCount) {
            x = this.pageCount - this.totalPages + 1;
            y = x + this.totalPages - 1;
        }
        if (y > 1) {
            for (let i = x; i <= y; i++) {
                this._pages.push(i);
            }
        }
        return this._pages;
    }
    get count() {
        if (this.pageCount == -1) {
            this.pageCount = this.calculatePageCount();
        }
        return this.pageCount;
    }
    calculatePageCount() {
        return Math.ceil(this.itemsCount / this.itemCountPerPage);
    }
    normalizePageNumber(number) {
        if (number < 1) {
            number = 1;
        }
        this.pageCount = this.count;
        if (this.pageCount > 0 && number > this.pageCount) {
            number = this.pageCount;
        }
        return number;
    }
    set setTotalPages(total_pages) {
        this.totalPages = total_pages;
        this.pageCount = -1;
    }
    set setItemCountPerPage(itemCountPerPage) {
        this.itemCountPerPage = itemCountPerPage;
    }
    get getItemCountPerPage() {
        return this.itemCountPerPage;
    }
    set setCurrentPageNumber(pageNumber) {
        this.currentPageNumber = pageNumber;
    }
    get getCurrentPageNumber() {
        return this.currentPageNumber;
    }
    recreate() {
        this.paginate();
    }
}
exports.IncorePagination = IncorePagination;
