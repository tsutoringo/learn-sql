import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import type * as Monaco from 'monaco-editor';

type COMPLETIONS = [label: string, keyword: string, detail: string, example: string][]

const __SQL_LANGUAGE_COMPLETE__KEYWORDS__ = ([
  ["SELECT", "SELECT", "データベースからデータを取得するためのSQLコマンド", "SELECT * FROM Customers;"],
  ["WHERE", "WHERE", "データをフィルタリングするための条件を指定するSQL句", "SELECT * FROM Products WHERE Price > 50;"],
  ["FROM", "FROM", "データを取得するテーブルを指定するSQL句", "SELECT * FROM Customers;"],
  ["GROUP BY", "GROUP BY", "データをグループ化するためのSQL句", "SELECT Country, COUNT(*) FROM Customers GROUP BY Country;"],
  ["HAVING", "HAVING", "グループ化されたデータに対する条件を指定するSQL句", "SELECT Country, COUNT(*) FROM Customers GROUP BY Country HAVING COUNT(*) > 5;"],
  ["ORDER BY", "ORDER BY", "データの並べ替え順序を指定するSQL句", "SELECT * FROM Products ORDER BY Price DESC;"],
  ["JOIN", "JOIN", "複数のテーブルを結合するためのSQL句", "SELECT Orders.OrderID, Customers.CustomerName FROM Orders JOIN Customers ON Orders.CustomerID = Customers.CustomerID;"],
  ["ON", "ON", "結合条件を指定するためのSQL句 (JOIN 句と共に使用)", "SELECT Customers.CustomerName, Orders.OrderID FROM Customers INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;"],
  ["INNER JOIN", "INNER JOIN", "一致する行のみを保持してテーブルを結合するSQL句", "SELECT Orders.OrderID, Customers.CustomerName FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;"],
  ["LEFT JOIN", "LEFT JOIN", "左側のテーブルのすべての行を保持して結合するSQL句", "SELECT Customers.CustomerName, Orders.OrderID FROM Customers LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;"],
  ["RIGHT JOIN", "RIGHT JOIN", "右側のテーブルのすべての行を保持して結合するSQL句", "SELECT Customers.CustomerName, Orders.OrderID FROM Customers RIGHT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;"],
  ["FULL OUTER JOIN", "FULL OUTER JOIN", "両方のテーブルのすべての行を保持して結合するSQL句", "SELECT Customers.CustomerName, Orders.OrderID FROM Customers FULL OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;"],
  ["LEFT OUTER JOIN", "LEFT OUTER JOIN", "左側のテーブルのすべての行を保持して結合するSQL句 (LEFT JOIN の別名)", "SELECT Customers.CustomerName, Orders.OrderID FROM Customers LEFT OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;"],
  ["RIGHT OUTER JOIN", "RIGHT OUTER JOIN", "右側のテーブルのすべての行を保持して結合するSQL句 (RIGHT JOIN の別名)", "SELECT Customers.CustomerName, Orders.OrderID FROM Customers RIGHT OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;"],
  ["INSERT INTO", "INSERT INTO", "新しいデータをテーブルに挿入するSQLコマンド", "INSERT INTO Customers (CustomerName, ContactName, Country) VALUES ('Company Inc.', 'John Doe', 'USA');"],
  ["VALUES", "VALUES", "新しいデータを挿入するための SQL クエリで使用するキーワード", "INSERT INTO Customers (CustomerName, ContactName, Country) VALUES ('Company Inc.', 'John Doe', 'USA');"],
  ["UPDATE", "UPDATE", "既存のデータを更新するSQLコマンド", "UPDATE Products SET Price = 20 WHERE ProductName = 'Widget';"],
  ["SET", "SET", "既存のデータを更新するための SQL クエリで使用するキーワード", "UPDATE Products SET Price = 20 WHERE ProductName = 'Widget';"],
  ["DELETE FROM", "DELETE FROM", "データをテーブルから削除するSQLコマンド", "DELETE FROM Customers WHERE CustomerName = 'Company Inc.';"],
  ["LIKE", "LIKE", "パターンマッチングを使用して文字列を検索するためのSQL演算子", "SELECT * FROM Products WHERE ProductName LIKE '%widget%';"],
  ["DISTINCT", "DISTINCT", "重複した行を削除して一意の結果を取得するためのSQLキーワード", "SELECT DISTINCT Country FROM Customers;"],
  ["AS", "AS", "列またはテーブルのエイリアス（別名）を指定するためのSQLキーワード", "SELECT ProductName AS 'Product Name', Price AS 'Unit Price' FROM Products;"],
  ["CASE", "CASE", "条件に基づいて値を計算するためのSQL式", "SELECT OrderID, Quantity, CASE WHEN Quantity > 30 THEN 'High' ELSE 'Low' END AS 'QuantityCategory' FROM OrderDetails;"],
  ["WHEN", "WHEN", "CASE式内で条件を指定するためのSQLキーワード", "SELECT OrderID, Quantity, CASE WHEN Quantity > 30 THEN 'High' ELSE 'Low' END AS 'QuantityCategory' FROM OrderDetails;"],
  ["THEN", "THEN", "CASE式内で条件が真の場合に実行される処理を指定するためのSQLキーワード", "SELECT OrderID, Quantity, CASE WHEN Quantity > 30 THEN 'High' ELSE 'Low' END AS 'QuantityCategory' FROM OrderDetails;"],
  ["ELSE", "ELSE", "CASE式内で条件が偽の場合に実行される処理を指定するためのSQLキーワード", "SELECT OrderID, Quantity, CASE WHEN Quantity > 30 THEN 'High' ELSE 'Low' END AS 'QuantityCategory' FROM OrderDetails;"],
  ["END", "END", "CASE式の終了を示すSQLキーワード", "SELECT OrderID, Quantity, CASE WHEN Quantity > 30 THEN 'High' ELSE 'Low' END AS 'QuantityCategory' FROM OrderDetails;"],
  ["IN", "IN", "複数の値の中から一致する値をフィルタリングするための SQL 演算子\n\`\`\`sql\nselect * from tblA\nwhere colA in ('a','b','z')\n\`\`\`\nと\n\`\`\`sql\nselect * from tblA\nwhere colA = 'a' or colA = 'b' or colA = 'z'\n\`\`\`\nは同義である", "SELECT * FROM Products WHERE CategoryID IN (1, 2, 3);"],
  ["CURRENT_TIMESTAMP", "CURRENT_TIMESTAMP", "現在の日付と時刻を取得する SQL 関数", "SELECT CURRENT_TIMESTAMP;"]
] as COMPLETIONS).map((e) => ({
  label: e[0],
  insertText: e[1],
  kind: monaco.languages.CompletionItemKind.Keyword,
  documentation: {
    value: `# ${e[0]}\n${e[2]}\n## 例\n\`\`\`sql\n${e[3]}\n\`\`\``,
    isTrusted: true
  }
}));

const __SQL_LANGUAGE_COMPLETE__FUNCTIONS__ = ([
  ["SUM", "SUM()", "指定した列の合計値を計算するSQL関数", "SELECT SUM(Price) FROM Products;"],
  ["COUNT", "COUNT()", "指定した列の行数を計算するSQL関数", "SELECT COUNT(*) FROM Orders;"],
  ["AVG", "AVG()", "指定した列の平均値を計算するSQL関数", "SELECT AVG(Price) FROM Products;"],
  ["MIN", "MIN()", "指定した列の最小値を計算するSQL関数", "SELECT MIN(Price) FROM Products;"],
  ["MAX", "MAX()", "指定した列の最大値を計算するSQL関数", "SELECT MAX(Price) FROM Products;"],
  ["CONCAT", "CONCAT()", "複数の文字列を結合するSQL関数", "SELECT CONCAT(FirstName, ' ', LastName) AS FullName FROM Customers;"],
  ["UPPER", "UPPER()", "文字列を大文字に変換するSQL関数", "SELECT UPPER(ProductName) FROM Products;"],
  ["LOWER", "LOWER()", "文字列を小文字に変換するSQL関数", "SELECT LOWER(Country) FROM Customers;"],
  ["LEFT", "LEFT()", "文字列の左側から指定した長さの部分を抽出するSQL関数", "SELECT LEFT(ProductName, 3) FROM Products;"],
  ["RIGHT", "RIGHT()", "文字列の右側から指定した長さの部分を抽出するSQL関数", "SELECT RIGHT(PhoneNumber, 4) FROM Customers;"],
  ["LEN", "LEN()", "文字列の長さを計算するSQL関数", "SELECT LEN(Description) FROM Products;"],
  ["ROUND", "ROUND()", "数値を指定した小数点以下の桁数に丸めるSQL関数", "SELECT ROUND(Price, 2) FROM Products;"],
  ["DATEPART", "DATEPART()", "日付または時刻から特定の部分を抽出するSQL関数", "SELECT DATEPART(YEAR, OrderDate) AS OrderYear FROM Orders;"],
  ["GETDATE", "GETDATE()", "現在の日付と時刻を取得するSQL関数", "SELECT GETDATE();"],
  ["DATEDIFF", "DATEDIFF()", "2つの日付または時刻の差を計算するSQL関数", "SELECT DATEDIFF(DAY, OrderDate, ShippedDate) AS DaysToShip FROM Orders;"]
] as COMPLETIONS).map((e) => ({
  label: e[0],
  insertText: e[1],
  kind: monaco.languages.CompletionItemKind.Function,
  documentation: {
    value: `# ${e[0]}\n${e[2]}\n## 例\n\`\`\`sql\n${e[3]}\n\`\`\``,
    isTrusted: true
  }
}));

export const registerCompletionItemProvider = (monaco: typeof Monaco) => monaco.languages.registerCompletionItemProvider('sql', {
  //@ts-ignore
  provideCompletionItems (model, position, content, token) {
    // console.log(model);
    // console.log(position);
    // console.log(content);
    // console.log(token);
    return {
      suggestions: __SQL_LANGUAGE_COMPLETE__KEYWORDS__.concat(__SQL_LANGUAGE_COMPLETE__FUNCTIONS__).map(e => ({
        range: new monaco.Range(
          position.lineNumber,
          position.column - 1,  // 補完候補を挿入する位置のカラム
          position.lineNumber,
          position.column       // 補完候補を挿入する位置のカラム
        ),
        ...e
      }))
    };
  }
});