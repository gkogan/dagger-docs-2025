Here is an example in the mdx file

```mdx
<Tabs groupId="language" queryString="sdk">
<Tab value="go" title="Go">

Here's an example of a Dagger Function that excludes everything in a given directory except Go source code files:

```go file=./snippets/fs-filters/pre-call/go/main.go

```

</Tab>
<Tab value="python" title="Python">

Here's an example of a Dagger Function that excludes everything in a given directory except Python source code files:

```python file=./snippets/fs-filters/pre-call/python/main.py

```

</Tab>
<Tab value="typescript" title="TypeScript">

Here's an example of a Dagger Function that excludes everything in a given directory except TypeScript source code files:

```typescript file=./snippets/fs-filters/pre-call/typescript/index.ts

```

</Tab>
<Tab value="php" title="PHP">

Here's an example of a Dagger Function that excludes everything in a given directory except PHP source code files:

```php file=./snippets/fs-filters/pre-call/php/src/MyModule.php

```

</Tab>
<Tab value="java" title="Java">

Here's an example of a Dagger Function that excludes everything in a given directory except Java source code files:

```java file=./snippets/fs-filters/pre-call/java/MyModule.java

```

</Tab>
</Tabs>
```

It needs to be replaced with the following code snippet, but grab the content of the file name from the /docs/current_docs/snippets directory:

```mdx
<CodeGroup>

```go Go icon="golang" wrap
file contents
```

```python Python icon="python" wrap
file contents
```

```typescript TypeScript icon="js"wrap
file contents
```

```php PHP icon="php" wrap
file contents
```

</CodeGroup>
```