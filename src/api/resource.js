import requset from '@/utils/request';

class Resource {
    constructor (uri) {
        this.uri = uri;
    }
    index (query) {
        return requset({
            url: `/${ this.uri }`,
            method: 'get',
            params: query,
        });
    }
    show (id) {
        return requset({
            url: `/${ this.uri }/${ id }`,
            method: 'get',
        });
    }
    get (urlParams) {
        return requset({
            url: `/${ this.uri }?${ urlParams }`,
            method: 'get',
        });
    }
    store (data) {
        return requset({
            url: `/${ this.uri }`,
            method: 'post',
            data: data
        });
    }
    update (id,data) {
        return requset({
            url: `/${ this.uri }/${ id }`,
            method: 'put',
            data: data
        });
    }
    post (id,data) {
        return requset({
            url: `/${ this.uri }/${ id }`,
            method: 'post',
            data: data
        });
    }
    delete (id) {
        return requset({
            url: `/${ this.uri }/${ id }`,
            method: 'delete',
        })
    }
}

export default Resource;