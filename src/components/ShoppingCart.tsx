import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utilities/formatCurrency"
import storeIems from '../data/items.json'

export function ShoppingCart({isOpen}:{
    isOpen:boolean
}){
    const {closeCart, cartItems} = useShoppingCart()
    return <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map((item)=>{
                    return <CartItem key={item.id} {...item} />
                })}
                <div className="mx-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total,cartItem) =>{
                        const item = storeIems.find(item => item.id==cartItem.id)
                        return total + ((item?.price || 0) * cartItem.quantity)
                    },0)
                    )}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>

}