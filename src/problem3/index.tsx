// Task: List out the computational inefficiencies and anti-patterns found in the code block below.

// ### Issues and Improvements

// 1. Inefficient Filtering and Sorting:
//    - The `useMemo` hook is used to filter and sort balances, but the filtering logic is incorrect and inefficient.
//    - The `lhsPriority` variable is not defined, causing a reference error.
//    - The filtering condition should be simplified.

// 2. Redundant Mapping:
//    - The `formattedBalances` array is created but not used. Instead, the `sortedBalances` array is used directly in the `rows` mapping.

// 3. Unnecessary Recalculations:
//    - The `prices` dependency in `useMemo` is unnecessary since it is not used in the memoized function.

// 4. TypeScript Type Issues:
//    - The `WalletBalance` interface is missing the `blockchain` property.
//    - The `rows` mapping uses `FormattedWalletBalance` but should use `WalletBalance`.

// ### Refactored Code

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const formattedBalance: FormattedWalletBalance = {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedBalance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

// ### Explanation of Improvements

// 1. Efficient Filtering and Sorting:
//    - Fixed the filtering logic to correctly filter out balances with a priority greater than -99 and amounts greater than 0.
//    - Simplified the sorting logic by directly comparing priorities.

// 2. Removed Redundant Mapping:
//    - Removed the `formattedBalances` array and directly formatted balances within the `rows` mapping.

// 3. Optimized useMemo Dependencies:
//    - Removed the unnecessary `prices` dependency from `useMemo`.

// 4. Corrected TypeScript Types:
//    - Added the `blockchain` property to the `WalletBalance` interface.
//    - Corrected the type used in the `rows` mapping to `WalletBalance`.
