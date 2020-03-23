/**
 * Class that calculates page numbers (buttons) that should be shown in pagination.
 */
class PaginationCounter {
    constructor(pageSize, totalRecordsCount, urlParams, displayPages = 5) {
        this.availableLimit = [5, 10, 20, 50]
        this.displayPages = displayPages
        this.showPerPage = true
        this.limit = null
        this.lastPageNum = null
        this.pageVarName = 'p'
        this.limitVarName = 'limit'

        if (!(urlParams instanceof URLSearchParams)) {
            throw new Error("Invalid urlParams type given.")
        }
        this.urlParams = urlParams
        this.pageSize = parseInt(pageSize)
        this.totalRecordsCount = parseInt(totalRecordsCount)
        
        if (Number.isNaN(this.pageSize) || this.pageSize < 0) {
            throw new Error('`pageSize` must be an integer and greater than or equal to zero.')
        }
        if (Number.isNaN(this.totalRecordsCount) || this.totalRecordsCount < 0) {
            throw new Error('`totalRecordsCount` must be an integer and greater than or equal to zero.')
        }
    }

    /**
     * Return current page
     * @return {number}
     */
    getCurrentPage() {
        return this.getPageFromRequest() != null 
            ? this.getPageFromRequest() 
            : 1
    }

    /**
     * Return current page limit
     * @return {number}
     */
    getLimit() {
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
    setLimit(limit) {
        const parsed = Number.parseInt(limit);
        if (Number.isNaN(parsed)) {
            throw new Error('`limit` must be an integer.')
        }
        this.limit = parsed > 0 ? parsed : null
    }

    /**
     * @param {string} varName 
     */
    setPageVarname(varName) {
        this.pageVarName = varName
    }

    /**
     * @return {string}
     */
    getPageVarName() {
        return this.pageVarName
    }

    /**
     * @param {string} varName 
     */
    setLimitVarName(varName) {
        this.limitVarName = varName
    }

    /**
     * @return {string}
     */
    getLimitVarName() {
        return this.limitVarName
    }

    /**
     * A convenience function to ease getting page from url params
     * @return {number|null}
     */
    getPageFromRequest() {
        const page = this.urlParams.get(this.getPageVarName())
        const parsed = Number.parseInt(page);
        return Number.isNaN(parsed) ? null : parsed
    }

    /**
     * A convenience function to ease getting limit from url params
     * @return {number|null}
     */
    getLimitFromRequest() {
        const limit = this.urlParams.get(this.getLimitVarName())
        const parsed = Number.parseInt(limit);
        return Number.isNaN(parsed) ? null : parsed
    }

    /**
     * Return maximum amount of pages to display
     * @return {number}
     */
    getDisplayPages() {
        return this.displayPages
    }

    /**
     * @param {boolean} showPerPage 
     */
    setShowPerPage(showPerPage) {
        this.showPerPage = showPerPage
    }

    /**
     * @return {boolean}
     */
    isShowPerPage() {
        if (this.availableLimit.length <= 1) {
            return false
        }
        return this.showPerPage
    }

    /**
     * Set the name for pager limit data
     * @param {array} limits 
     */
    setAvailableLimit(limits) {
        if (Array.isArray(limits) === false) {
            throw new Error('`limits` must be an array.')
        }
        this.availableLimit = limits
    }

    /**
     * Retrieve pager limit
     * @return {array}
     */
    getAvailableLimit() {
        return this.availableLimit
    }

    /**
     * Returns the number of first item for current page
     * @return {number}
     */
    getFirstNum() {
        return this.pageSize
            * (this.getPageFromRequest() - 1) + 1
    }

    /**
     * Returns the number of last item for current page
     * @return {number}
     */
    getLastNum() {
        return this.pageSize 
                * (this.getPageFromRequest() - 1) 
                + this.pageSize
    }

    /**
     * Retrieve total number of records
     * @return {number}
     */
    getTotalNum() {
        return this.totalRecordsCount
    }

    /**
     * Check if current page is a first page
     * @return {boolean}
     */
    isFirstPage() {
        return this.getPageFromRequest() === 1
    }

    /**
     * Retrieve number of first page
     * @return {number}
     */
    getFirstPageNum() {
        return 1
    }

    /**
     * Retrieve number of previous page
     * @return {number}
     */
    getPreviousPageNum() {
        return this.getPageFromRequest() - 1
    }

    /**
     * Retrieve number of next page
     * @return {number}
     */
    getNextPageNum() {
        return this.getPageFromRequest() + 1
    }

    /**
     * Retrieve number of last page
     * @return {number}
     */
    getLastPageNum() {
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
    isLastPage() {
        return this.getPageFromRequest() >= this.getLastPageNum()
    }

    /**
     * Check if limit is the same as current limit
     * @param {number} limit 
     * @return {boolean}
     */
    isLimitCurrent(limit) {
        return parseInt(limit) === this.getLimit()
    }

    /**
     * Check if page is the same as current page
     * @param {number} page 
     * @return {boolean}
     */
    isPageCurrent(page) {
        return parseInt(page) === this.getCurrentPage()
    }

    /**
     * Retrieve page numbers
     * @return {array}
     */
    getPages() {
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