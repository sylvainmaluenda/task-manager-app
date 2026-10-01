import { Category } from '@/features/categories/types/category.type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../shared/components/shadcn/select';

interface Option {
  label: string;
  value: string;
}

interface Props {
  defaultOption: Option;
  categories: Category[];
  categoryId: number | null;
  onChange: (value: number | null) => void;
}

export function SelectCategory({
  defaultOption,
  categories,
  categoryId,
  onChange,
}: Props) {
  const options = [
    { label: defaultOption.label, value: defaultOption.value },
    ...categories.map((c) => ({
      label: c.name,
      value: c.id.toString(),
    })),
  ];

  return (
    <Select
      value={categoryId?.toString() ?? options[0].value}
      onValueChange={(value) =>
        onChange(value === options[0].value ? null : Number(value))
      }
    >
      <SelectTrigger className="w-60 bg-white">
        <SelectValue placeholder="All categories" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
