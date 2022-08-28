import ApiInstance from '../utils/ApiInstance';
const BASE = 'https://upayments-studycase-api.herokuapp.com/api/';

export async function getProductList() {
    try {
        const response = await ApiInstance({
            method: 'GET',
            url: BASE + 'products',
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getCategoryList() {
    try {
        const response = await ApiInstance({
            method: 'GET',
            url: BASE + 'categories',
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getFilterProduct(id) {
    try {
        const response = await ApiInstance({
            method: 'GET',
            url: BASE + `categories/${id}`,
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function addProduct(params) {
    try {
        const response = await ApiInstance({
            method: 'POST',
            url: BASE + `products`,
            data: params
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}