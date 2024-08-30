"use client";
import { Autocomplete, Box, Grid, TextField, TextFieldProps, Typography } from "@mui/material";
import React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { debounce } from "@mui/material/utils";
import SearchProducts, { SearchProduct } from "@/actions/product/search";
import { useInterface } from "@/providers/InterfaceProvider";

interface SelectorProps {
  onSubmit(Product: SearchProduct | null): void;
  fieldProps?: TextFieldProps 
}

const Selector = (props: SelectorProps) => {
  const [value, setValue] = React.useState<SearchProduct | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly SearchProduct[]>([]);
  const { isBackdrop } = useInterface();

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly SearchProduct[]) => void
        ) => {
          SearchProducts(request.input)
            .then((resp) => {
              callback(resp.data);
            })
            .catch(() => {
              callback();
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && inputValue) {
      event.preventDefault();
    }
  };

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
      readOnly={isBackdrop}
      onChange={(_: any, newValue: SearchProduct | null) => {
        console.log("submit");

        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        props.onSubmit(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props.fieldProps}
          label="กรุณาเลือกสินค้า"
          fullWidth
          required
          placeholder="รหัสสินค้า, ชื่อสินค้า, คีย์เวิร์ด"
          onKeyDown={handleKeyDown} // Handle key press events here
        />
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
