"use client";
import React from 'react'
import { Item } from './childs/CartItem';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRecoilState } from 'recoil';
import { CartState } from '../../../atoms/cart';

const Cart = () => {
  const [cart] = useRecoilState(CartState);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell variant="head">รหัสสินค้า</TableCell>
            <TableCell variant="head">ชื่อสินค้า</TableCell>
            <TableCell variant="head">ราคา</TableCell>
            <TableCell variant="head">ราคา(รวม)</TableCell>
            <TableCell variant="head">จำนวน</TableCell>
            <TableCell variant="head">เครื่องมือ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            cart.length > 0 ? (
              cart.map((product, index) => {
                return (
                  <Item
                    key={`${product.serial}-${index}`}
                    {...product}
                  />
                )
              })
            ):(
              <TableRow>
                <TableCell colSpan={7} variant='footer' align='center' >ไม่มีสินค้าภายในตะกร้า</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default Cart