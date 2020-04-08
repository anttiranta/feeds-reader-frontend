/**
 * Class that calculates page numbers (buttons) that should be shown in pagination.
 */
class PaginationCounter 
{
    private availableLimit: number[] = [5, 10, 20, 50]
    private displayPages: number
    private showPerPage: boolean = true
    private limit: number | null = null
    private pageSize: number
    private totalRecordsCount: number
    private urlParams: URLSearchParams
    private lastPageNum: number | null = null
    private pageVarName: string = 'p'
    private limitVarName: string = 'limit'

    constructor(pageSize: number, totalRecordsCount: number, urlParams: URLSearchParams, displayPages = 5) {
        this.displayPages = displayPages
        this.pageSize = pageSize
        this.totalRecordsCount = totalRecordsCount
        this.urlParams = urlParams

        this.validate()
    }

    private validate(): void {
        if (this.pageSize < 0) {
            throw new Error('`pageSize` must be greater than or equal to zero.')
        }
        if (this.totalRecordsCount < 0) {
            throw new Error('`totalRecordsCount` must be greater than or equal to zero.')
        }
    }

    /**
     * Return current page
     * @return {number}
     */
    getCurrentPage(): number {
        return this.getPageFromRequest() != null 
            ? this.getPageFromRequest() 
            : 1
    }

    /**
     * Return current page limit
     * @return {number}
     */
    getLimit(): number {
        if (this.limit != null) {
            return this.limit
        }

        const limits = this.getAvailableLimit()

        const parsedLimit = Number.parseInt(this.urlParams.get(this.getLimitVarName()));
        if (Number.isNaN(parsedLimit) === false) {
            if (limits.includes(parsedLimit)) {
                return parsedLimit
            }
        }
        return this.getAvailableLimit()[0]
    }

    /**
     * Setter for limit items per page
     * @param {number} limit 
     */
    setLimit(limit: number) {
        this.limit = limit > 0 ? limit : null
    }

    /**
     * @param {string} varName 
     */
    setPageVarname(varName: string) {
        this.pageVarName = varName
    }

    /**
     * @return {string}
     */
    getPageVarName(): string {
        return this.pageVarName
    }

    /**
     * @param {string} varName 
     */
    setLimitVarName(varName: string) {
        this.limitVarName = varName
    }

    /**
     * @return {string}
     */
    getLimitVarName(): string {
        return this.limitVarName
    }

    /**
     * A convenience function to ease getting page from url params
     * @return {number|null}
     */
    getPageFromRequest(): number|null {
        const page = this.urlParams.get(this.getPageVarName())
        const parsed = Number.parseInt(page);
        return Number.isNaN(parsed) ? null : parsed
    }

    /**
     * A convenience function to ease getting limit from url params
     * @return {number|null}
     */
    getLimitFromRequest(): number|null {
        const limit = this.urlParams.get(this.getLimitVarName())
        const parsed = Number.parseInt(limit);
        return Number.isNaN(parsed) ? null : parsed
    }

    /**
     * Return maximum amount of pages to display
     * @return {number}
     */
    getDisplayPages(): number {
        return this.displayPages
    }

    /**
     * @param {boolean} showPerPage 
     */
    setShowPerPage(showPerPage: boolean) {
        this.showPerPage = showPerPage
    }

    /**
     * @return {boolean}
     */
    isShowPerPage(): boolean {
        if (this.availableLimit.length <= 1) {
            return false
        }
        return this.showPerPage
    }

    /**
     * Set the name for pager limit data
     * @param {array} limits 
     */
    setAvailableLimit(limits: number[]) {
        this.availableLimit = limits
    }

    /**
     * Retrieve pager limit
     * @return {array}
     */
    getAvailableLimit(): number[] {
        return this.availableLimit
    }

    /**
     * Returns the number of first item for current page
     * @return {number}
     */
    getFirstNum(): number {
        return this.pageSize
            * (this.getPageFromRequest() - 1) + 1
    }

    /**
     * Returns the number of last item for current page
     * @return {number}
     */
    getLastNum(): number {
        return this.pageSize 
                * (this.getPageFromRequest() - 1) 
                + this.pageSize
    }

    /**
     * Retrieve total number of records
     * @return {number}
     */
    getTotalNum(): number {
        return this.totalRecordsCount
    }

    /**
     * Check if current page is a first page
     * @return {boolean}
     */
    isFirstPage(): boolean {
        return this.getPageFromRequest() === 1
    }

    /**
     * Retrieve number of first page
     * @return {number}
     */
    getFirstPageNum(): number {
        return 1
    }

    /**
     * Retrieve number of previous page
     * @return {number}
     */
    getPreviousPageNum(): number {
        return this.getPageFromRequest() - 1
    }

    /**
     * Retrieve number of next page
     * @return {number}
     */
    getNextPageNum(): number {
        return this.getPageFromRequest() + 1
    }

    /**
     * Retrieve number of last page
     * @return {number}
     */
    getLastPageNum(): number {
        if (this.lastPageNum === null) {
            const lastPageNum = Math.ceil(this.totalRecordsCount
                / this.getLimitFromRequest())
            this.lastPageNum = lastPageNum > 0 ? lastPageNum : 1;
        }
        return this.lastPageNum
    }

    /**
     * Check if current page is a last page
     * @return {boolean}
     */
    isLastPage(): boolean {
        return this.getPageFromRequest() >= this.getLastPageNum()
    }

    /**
     * Check if limit is the same as current limit
     * @param {number} limit 
     * @return {boolean}
     */
    isLimitCurrent(limit: number): boolean {
        return limit === this.getLimit()
    }

    /**
     * Check if page is the same as current page
     * @param {number} page 
     * @return {boolean}
     */
    isPageCurrent(page: number): boolean {
        return page === this.getCurrentPage()
    }

    /**
     * Retrieve page numbers
     * @return {array}
     */
    getPages(): number[] {
        if (this.getLastPageNum() <= this.displayPages) {
            return [...Array(this.getLastPageNum()).keys()].map(i => i + 1);
        } else {
            let start = 1
            let finish = 1
            const half = Math.ceil(this.displayPages / 2)

            if (this.getPageFromRequest() >= half &&
            this.getPageFromRequest() <= this.getLastPageNum() - half
            ) {
                start = this.getPageFromRequest() - half + 1
                finish = start + this.displayPages - 1
            } else if (this.getPageFromRequest() < half) {
                start = 1
                finish = start + this.displayPages - 1
            } else if (this.getPageFromRequest() > this.getLastPageNum() - half) {
                finish = this.getLastPageNum()
                start = finish - this.displayPages + 1
            }

            const pages = [...Array(finish).keys()].map(i => i + start)
            return pages.length <= this.displayPages ? pages : pages.slice(0, this.displayPages)
        }
    }
}

export default PaginationCounter