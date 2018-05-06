const initialState = {};

export default function data(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        default:
            return state;
    }
}