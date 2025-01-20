import ChevronDownIcon from "@assets/icons/chevron-down.svg?react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";

export default function CurrencyPopover({
  items,
  currency,
  onChangeCurrency,
}: {
  items: { text: string; icon: string }[];
  currency: string;
  onChangeCurrency: (currency: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (newCurrency: string) => {
    onChangeCurrency(newCurrency);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCurrency = useMemo(() => {
    if (currency) return items.find((item) => item.text === currency);
    return items[0];
  }, [currency, items]);

  const renderCurrentCurrency = () => {
    if (!currentCurrency) return;
    return (
      <Box
        display="flex"
        alignItems="center"
        sx={{ cursor: "pointer", gap: 1, px: 1 }}
      >
        <img src={currentCurrency.icon} alt={currentCurrency.text} width={24} />
        <h3>{currentCurrency.text}</h3>
        <ChevronDownIcon />
      </Box>
    );
  };

  return (
    <div>
      <Box onClick={handleClick}>{renderCurrentCurrency()}</Box>
      <Popover
        id="popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              overflow: "hidden",
            },
          },
        }}
      >
        <Box
          sx={{
            width: 300,
            p: "8px",
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 2, width: "100%", position: "sticky", top: 0, zIndex: 1 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <List component="nav" sx={{ maxHeight: 300, overflow: "auto" }}>
            {filteredItems.map((item, index) => (
              <ListItemButton
                key={index}
                selected={currentCurrency?.text === item.text}
                onClick={() => handleListItemClick(item.text)}
              >
                {item.icon && (
                  <ListItemIcon>
                    <Box component="img" src={item.icon} width={24} />
                  </ListItemIcon>
                )}
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Popover>
    </div>
  );
}
