// src/components/ExpenseDialog.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ExpenseItem, Category } from '../types';
import { getCatFact } from '@utils';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: ExpenseItem) => void;
}

const categories: Category[] = ['Food', 'Furniture', 'Accessory'];

export const ExpenseDialog = ({ open, onClose, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [amount, setAmount] = useState('');
  const [fact, setFact] = useState('');

  useEffect(() => {
    if (open) {
      getCatFact().then(setFact);
      setName('');
      setCategory('Food');
      setAmount('');
    }
  }, [open]);

  const handleSubmit = () => {
    if (!name || !amount || isNaN(Number(amount))) return;
    onSubmit({
      id: crypto.randomUUID(),
      name,
      category,
      amount: parseFloat(amount),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Cat Expense</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          margin="normal"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
        />
        <Typography variant="body2" color="textSecondary" mt={2}>
          🐾 Random Cat Fact: {fact}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
