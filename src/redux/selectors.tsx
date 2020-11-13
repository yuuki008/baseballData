import { createSelector } from "reselect";

const user = (state:any) => state.user

export const getIsSignedIn = createSelector(
    [user],
    state => state.isSignedIn
)

export const getUid = createSelector(
    [user],
    state => state.uid
)

export const getUsername = createSelector(
    [user],
    state => state.username
)