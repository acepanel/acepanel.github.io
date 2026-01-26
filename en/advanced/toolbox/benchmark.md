# Benchmark Test

The benchmark feature is used to test the CPU, memory, and disk performance of the server, helping you understand the actual performance of your server.

![Benchmark Test](/images/toolbox/toolbox-benchmark.png)

## Test Items

### CPU Test

Tests the computing power of the CPU by executing a large number of mathematical operations to evaluate processor performance.

### Memory Test

Tests the read and write speed of memory to evaluate the performance of the memory subsystem.

### Disk Test

Tests the read and write speed of the disk to evaluate the I/O performance of the storage device.

## Usage

Click the **Start Benchmark** button, and the system will execute CPU, memory, and disk tests in sequence. After the tests are completed, the scores for each item will be displayed.

## Result Explanation

Benchmark results are displayed as numerical values, with higher values indicating better performance.

::: warning Note
Benchmark results are for reference only. Due to system resource scheduling, caching, and other factors, test results may differ from actual performance in use.
:::

## Testing Recommendations

1. Close unnecessary services and processes before testing
2. Avoid testing during peak business hours
3. Multiple tests averaged are more accurate
4. Test results may fluctuate at different times

## Performance Optimization Reference

If benchmark results are not ideal, consider:

- **Low CPU performance**: Check if any process is using too much CPU
- **Low memory performance**: Check memory usage, whether there are memory leaks
- **Low disk performance**: Check disk health status, consider upgrading to SSD
