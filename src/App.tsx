import { useState } from 'react';
import { Button, Container, Typography, Stack } from '@mui/material';
import { ExpenseItem } from '@types';
import { ExpenseDialog } from '@components/ExpenseDialog';
import { ExpenseList } from '@components/ExpenseList';

function App() {
  const [items, setItems] = useState<ExpenseItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const addItem = (item: ExpenseItem) => {
    setItems((prev) => [...prev, item]);
  };

  const deleteItems = () => {
    setItems((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getTopCategories = (): string[] => {
    const totals: Record<string, number> = {};
    items.forEach(({ category, amount }) => {
      totals[category] = (totals[category] || 0) + amount;
    });

    const max = Math.max(...Object.values(totals));
    return Object.entries(totals)
      .filter(([, amt]) => amt === max)
      .map(([cat]) => cat);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🐱 Cat Expense Tracker
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Expense
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={deleteItems}
          disabled={!selectedIds.length}
        >
          Delete Expense
        </Button>
      </Stack>
      <ExpenseList
        items={items}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        topCategories={getTopCategories()}
      />
      <ExpenseDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) =>
          addItem({
            ...data,
            id: crypto.randomUUID(),
            name: data.item,
          })
        }
      />
    </Container>
  );
}

export default App;
