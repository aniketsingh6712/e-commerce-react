import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const productslice=createSlice({
    name:"product",
    initialState,
    reducers:{
        AddItem:(state,action)=>{
            const product=action.payload;
            const exist=state.find((x)=>x.id===product.id);
            
            if(exist){
                
                state.map((x)=>x.id===product.id?{...x,qty:x.qty+=1}:x);
            }
            else{
                const Newproduct={...product,qty:1,}
                state.push(Newproduct);
            }

        },
        DelItem:(state,action)=>{
            const product=action.payload
            const exist1=state.find((x)=>x.id===product.id);
            if(exist1.qty===1){
                
                const states=state.filter((x)=>x.id!==product.id);
                return states
                
                
            }
            else{
                state.map((x)=>x.id===product.id?{...x,qty:x.qty-=1}:x)
            }
        },
        DelEntireItem: (state, action) => {
            const product=action.payload
            const states=state.filter((x) => x.id !== product.id);
            return states;
        },
        ClearItem:(state,action)=>{
            return [];
           
        },
        
        
    }
})
export const {AddItem,DelItem,ClearItem,DelEntireItem}=productslice.actions;
export default productslice.reducer;