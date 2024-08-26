"use client";
import React from "react";
import { Item } from "./childs/CartItem";
import {
  Alert,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { CartState } from "../../../atoms/cart";

const Cart = () => {
  const [cart] = useRecoilState(CartState);

  return (
    <Stack spacing={1}>
      {
        cart.some(val => val.count > val.stock) && (
          <Alert severity="error" >สินค้าสีแดงเป็นสินค้าที่สต๊อกคงเหลือไม่เพียงพอและระบบจะทำการค้างสินค้าไว้ คุณสามารถจัดการได้ภายหลังที่เมนู "สินค้าค้าง"</Alert>
        )
      }
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell variant="head">รหัสสินค้า</TableCell>
              <TableCell variant="head">ชื่อสินค้า</TableCell>
              <TableCell variant="head">ราคา</TableCell>
              <TableCell variant="head">สต๊อก</TableCell>
              <TableCell variant="head">จำนวน</TableCell>
              <TableCell variant="head">เครื่องมือ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length > 0 ? (
              cart.map((product, index) => {
                return <Item key={`${product.serial}-${index}`} {...product} />;
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} variant="footer" align="center">
                  ไม่มีสินค้าภายในตะกร้า
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Cart;
