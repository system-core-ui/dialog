/**
 * Shared dismiss coordination between Popover, nested Popovers, and Modal.
 *
 * ## How it works
 *
 * 1. When a Popover detects an outside mousedown, it calls `queuePopoverDismiss()`
 *    which queues a dismiss callback.
 *
 * 2. If multiple nested Popovers all detect the same mousedown as "outside",
 *    each queues its callback. A microtask then processes only the LAST
 *    (deepest/innermost) callback, discarding the rest.
 *
 * 3. `markPopoverDismiss()` sets a timestamp that Modal checks via
 *    `wasPopoverDismiss()` to skip closing when a Popover just dismissed.
 *
 * 4. `wasPopoverDismissRecent()` is checked by a Popover's own `useClick`
 *    handler to prevent toggling after a dismiss was just processed.
 */

// ─── Popover ↔ Modal timestamp flag ─────────────────────

let popoverDismissTimestamp = 0;

/** Called after a Popover dismiss is executed */
function markPopoverDismiss(): void {
  popoverDismissTimestamp = Date.now();
}

/** Called by Modal to check if a Popover just handled a dismiss */
export function wasPopoverDismiss(): boolean {
  return Date.now() - popoverDismissTimestamp < 200;
}

// ─── Nested Popover dismiss queue ────────────────────────

let pendingDismisses: (() => void)[] = [];
let flushScheduled = false;

/**
 * Queue a Popover dismiss callback.
 *
 * Multiple nested Popovers may queue in the same mousedown event.
 * After all synchronous handlers run, only the LAST callback
 * (deepest child) is executed.
 */
export function queuePopoverDismiss(dismiss: () => void): void {
  pendingDismisses.push(dismiss);

  if (!flushScheduled) {
    flushScheduled = true;

    queueMicrotask(() => {
      flushScheduled = false;

      // Execute only the FIRST dismiss — the deepest nested Popover
      // (React useEffect runs children before parents, so child's handler
      //  registers first on document and fires first in capture phase)
      const firstDismiss = pendingDismisses.shift();
      pendingDismisses = [];

      if (firstDismiss) {
        markPopoverDismiss();
        firstDismiss();
      }
    });
  }
}
