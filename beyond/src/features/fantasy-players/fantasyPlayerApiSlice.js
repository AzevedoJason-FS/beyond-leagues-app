import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const fantasyPlayersAdapter = createEntityAdapter({})

const initialState = fantasyPlayersAdapter.getInitialState()

export const fantasyPlayersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getfantasyPlayers: builder.query({
            query: () => '/fantasyPlayers',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 60,
            transformResponse: responseData => {
                const loadedfantasyPlayers = responseData.map(fantasyPlayer => {
                    fantasyPlayer.id = fantasyPlayer._id
                    return fantasyPlayer
                });
                return fantasyPlayersAdapter.setAll(initialState, loadedfantasyPlayers)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        { type: 'fantasyPlayer', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'fantasyPlayer', id}))
                    ]
                }
            }
        })
    })
}) 

export const {
    useGetfantasyPlayersQuery,
} = fantasyPlayersApiSlice

// returns the query result object
export const selectfantasyPlayersResult = fantasyPlayersApiSlice.endpoints.getfantasyPlayers.select()

// creates memoized selector
const selectfantasyPlayersData = createSelector(
    selectfantasyPlayersResult,
    fantasyPlayersResult => fantasyPlayersResult.data // normalized state obhect with ids & entities
)

// getSelectors create these selectros and we rename them with aliases using destructuring

export const {
    selectAll: selectAllfantasyPlayers,
    selectById: selectfantasyPlayerById,
    selectIds: selectfantasyPlayerIds
    // Pass in a selector that returns the fantasyPlayers slice of state
} = fantasyPlayersAdapter.getSelectors(state => selectfantasyPlayersData(state) ?? initialState)