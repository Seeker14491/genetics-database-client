interface RootState {
  tables: string[],
  schema: DbSchema | null,
}

type DbSchema = Map<string, TableSchema>;

interface TableSchema {
  columnNames: string[],
  columnTypes: string[],
}

type Filter = FilterWithoutId & { id: string };

type FilterWithoutId = FilterBase & (BooleanFilter | IntegerFilter | RealFilter | TextFilter
  | CharFilter | DateFilter);

interface FilterBase {
  table: string,
  column: string,
}

interface BooleanFilter {
  kind: 'boolean',
  value: boolean,
}

interface IntegerFilter {
  kind: 'integer',
  comparisonOrBetween: ComparisonOrBetween<number>,
}

interface RealFilter {
  kind: 'real',
  comparisonOrBetween: ComparisonOrBetween<number>,
}

interface TextFilter {
  kind: 'text',
  value: string,
  substringSearch: boolean,
  caseSensitive: boolean,
}

interface CharFilter {
  kind: 'char',
  value: string,
  caseSensitive: boolean,
}

interface DateFilter {
  kind: 'date',
  comparisonOrBetween: ComparisonOrBetween<Date>,
}

type ComparisonOrBetween<T> = OneValueComparison<T> | Between<T>;

interface OneValueComparison<T> {
  kind: 'one-value',
  value: T,
  comparisonType: ComparisonType,
}

type ComparisonType = '<' | '<=' | '=' | '>=' | '>';

interface Between<T> {
  kind: 'between',
  start: T,
  end: T,
}
