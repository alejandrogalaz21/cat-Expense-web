// src/components/ExpenseDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CatInspo } from './CatInspo';

const categories = ['Food', 'Furniture', 'Accessory'] as const;

const ExpenseSchema = z.object({
  item: z.string().min(1, 'Item name is required'),
  category: z.enum(categories, { errorMap: () => ({ message: 'Category is required' }) }),
  amount: z.coerce.number().gt(0, 'Amount must be greater than zero'),
});

type ExpenseForm = z.infer<typeof ExpenseSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseForm) => void;
}

export const ExpenseDialog = ({ open, onClose, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseForm>({
    resolver: zodResolver(ExpenseSchema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = (data: ExpenseForm) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Box flex={1} component="form" onSubmit={handleSubmit(submit)} noValidate>
            <TextField
              fullWidth
              label="Item"
              {...register('item')}
              margin="normal"
              error={!!errors.item}
              helperText={errors.item?.message}
            />
            <TextField
              select
              fullWidth
              label="Category"
              defaultValue=""
              {...register('category')}
              margin="normal"
              error={!!errors.category}
              helperText={errors.category?.message}
            >
              <MenuItem value="">Select a category</MenuItem>
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
              {...register('amount')}
              margin="normal"
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Box>

          <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <CatInspo />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
