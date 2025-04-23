import {  useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Skeleton,
} from '@mui/material';
import { ExpenseItem } from '@types';
import { ExpenseDialog } from '@components/ExpenseDialog';
import { ExpenseList } from '@components/ExpenseList';
import { ExpenseChart } from '@components/ExpenseChart';

/**
 * Main App component - manages state, UI, and interaction for expense tracking
 */
function App() {
  const [items, setItems] = useState<ExpenseItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [loading, setLoading] = useState(false);

  /**
   * Add a new expense item and simulate a loading delay
   */
  const addItem = (item: ExpenseItem) => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, item]);
      setLoading(false);
    }, 800); // Simulate loading for 800ms
  };

  /**
   * Delete selected items
   */
  const deleteItems = () => {
    setItems((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setSelectedIds([]);
  };

  /**
   * Toggle the selection of an item by its ID
   */
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /**
   * Determine the category or categories with the highest total spending
   */
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

      <Stack direction="row" spacing={2} mb={2} alignItems="center">
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
        {items.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Chart Type</InputLabel>
            <Select
              value={chartType}
              label="Chart Type"
              onChange={(e) =>
                setChartType(e.target.value as 'bar' | 'pie')
              }
            >
              <MenuItem value="bar">Bar Chart</MenuItem>
              <MenuItem value="pie">Pie Chart</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>

      {items.length === 0 ? (
        <Box
          sx={{
            p: 4,
            border: '1px dashed grey',
            borderRadius: 2,
            textAlign: 'center',
            mt: 4,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No expenses yet. Click “Add Expense” to get started!
          </Typography>
        </Box>
      ) : loading ? (
        <>
          {/* Skeleton for Chart */}
          <Skeleton variant="rounded" height={240} sx={{ mb: 2 }} />
          {/* Skeleton for Table */}
          <Skeleton variant="rounded" height={300} />
        </>
      ) : (
        <>
          <ExpenseChart
            items={items}
            topCategories={getTopCategories()}
            chartType={chartType}
          />
          <ExpenseList
            items={items}
            selectedIds={selectedIds}
            toggleSelect={toggleSelect}
            topCategories={getTopCategories()}
          />
        </>
      )}

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
