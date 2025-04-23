// src/components/ExpenseList.tsx
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { ExpenseItem } from '@types';

interface Props {
  items: ExpenseItem[];
  selectedIds: string[];
  toggleSelect: (id: string) => void;
  topCategories: string[];
}

export const ExpenseList = ({
  items,
  selectedIds,
  toggleSelect,
  topCategories,
}: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => {
          const highlight = topCategories.includes(item.category);
          return (
            <TableRow key={item.id} style={highlight ? { backgroundColor: '#d0f5c9' } : {}}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>${item.amount.toFixed(2)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
