export function PageQuery(page = 1, size = 10) {
    this.page = page;
    this.size = size;
    this.totalPage = 0;
    this.totalNum = 0;

    this.covertResponses = (data) => {
        this.page++;
        this.size = data.size;
        this.totalPage = data.totalPage;
        this.totalNum = data.totalNum;
    };

    this.resetPage = () => {
        this.page = 1;
    }
}

