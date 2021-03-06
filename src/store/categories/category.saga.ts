import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';

import { fetchCategoriesSuccess, fetchCategoriesFailure } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';



export function* fetchCategoriesStartAsync() {
    try {
        const categoriesArray = yield* call(
            getCategoriesAndDocuments
        );
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield* put(fetchCategoriesFailure(error as Error));
    }
}

export function* onFetchcategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesStartAsync)
}

export function* categoriesSaga() {
    yield* all([call(onFetchcategories)]);
}