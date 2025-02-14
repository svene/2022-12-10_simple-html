import { root, signal, computed, effect, tick } from 'https://cdn.jsdelivr.net/npm/@maverick-js/signals@6.0.0/+esm'
// import { root, signal, computed, effect, tick } from '@maverick-js/signals';

root((dispose) => {
    // Create - all types supported (string, array, object, etc.)
    const $m = signal(1);
    const $x = signal(1);
    const $b = signal(0);

    // Compute - only re-computed when `$m`, `$x`, or `$b` changes.
    const $y = computed(() => $m() * $x() + $b());

    // Effect - this will run whenever `$y` is updated.
    const stop = effect(() => {
        console.log($y());

        // Called each time `effect` ends and when finally disposed.
        return () => {};
    });

    $m.set(10); // logs `10` inside effect

    // Flush queue synchronously so effect is run.
    // Otherwise, effects will be batched and run on the microtask queue.
    tick();

    $b.set((prev) => prev + 5); // logs `15` inside effect

    tick();

    // Nothing has changed - no re-compute.
    $y();

    // Stop running effect.
    stop();

    // ...

    // Dispose of all signals inside `root`.
    dispose();
});
