import { Search } from "@mui/icons-material";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";

const SearchField = ({
  data = [],
  label = "",
  placeholder = "",
}: {
  data: string[];
  label?: string;
  placeholder?: string;
}) => {
  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={data?.map((option: any) => option?.title || "")}
      sx={{
        width: 481,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: "search",
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchField;
