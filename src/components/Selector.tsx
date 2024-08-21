"use client";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { debounce } from "@mui/material/utils";
import SearchProducts, { SearchProduct } from "@/actions/product/search";

interface SelectorProps {
  onSubmit(Product: SearchProduct | null): void;
}

const Selector = (props: SelectorProps) => {
  const [value, setValue] = React.useState<SearchProduct | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly SearchProduct[]>([]);

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly SearchProduct[]) => void
        ) => {
          SearchProducts(request.input).then((resp) => {
            if (!resp || !resp.data || !resp.success) throw Error("no-data");
            callback(resp.data);
          });
        },
        400
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    fetch({ input: inputValue }, (results?: readonly SearchProduct[]) => {
      if (active) {
        let newOptions: readonly SearchProduct[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="product-selector"
      sx={{ width: "100%" }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      filterSelectedOptions
      value={value}
      noOptionsText="ไม่พบสินค้า"
      onChange={(_: any, newValue: SearchProduct | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        props.onSubmit(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="กรุณาเลือกสินค้า" fullWidth />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        const parts = parse(option.label, match(option.label, inputValue));
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  จำนวน: {option.stock} | รหัส: {option.serial}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default Selector;
