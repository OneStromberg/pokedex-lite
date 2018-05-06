const initialState = {};

export default function user(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        default:
            return state;
    }
}