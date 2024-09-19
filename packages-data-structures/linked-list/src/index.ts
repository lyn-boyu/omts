/** Definition for singly-linked list. */

export class ListNode<T> {
    /** val is the value of the node */
    val: T;

    /** next is a reference to the next node in the list */
    next: ListNode<T> | null;

    /** constructor initializes the node with a value and a reference to the next node */
    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }

    /** Get the length of the linked list */
    static size<T>(head: ListNode<T> | null): number {
        let length = 0;
        while (head) {
            length++;
            head = head.next;
        }
        return length;
    }

    /** Create a linked list from an array */
    static createFromArray<T>(arr: T[]): ListNode<T> | null {
        if (!arr.length) return null;

        const head = new ListNode(arr[0]);
        let current = head;
        for (let i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }

    /** Convert a linked list to an array */
    static toArray<T>(head: ListNode<T> | null): T[] {
        const result: T[] = [];
        while (head) {
            result.push(head.val);
            head = head.next;
        }
        return result;
    }

    /** Insert a value at a specific position */
    static insertAt<T>(head: ListNode<T> | null, index: number, val: T): ListNode<T> | null {
        // If inserting at the head (index 0), create a new head node
        if (index <= 0) {
            const newNode = new ListNode(val);
            newNode.next = head;
            return newNode;
        }
        let current = head;
        let i = 0;
        // Traverse to the node just before the insertion point
        while (current && i < index - 1) {
            current = current.next;
            i++;
        }
        // If current is not null, insert the new node
        if (current) {
            const newNode = new ListNode(val);
            newNode.next = current.next;
            current.next = newNode;
        }
        return head; // Return the (possibly unchanged) head of the list
    }

    /** Delete a node at a specific position */
    static deleteAt<T>(head: ListNode<T> | null, index: number): ListNode<T> | null {
        if (index < 0 || !head) return head;

        const dummy = new ListNode<T>(head.val, head);
        let current = dummy;
        let i = 0;
        while (current.next && i < index) {
            current = current.next;
            i++;
        }
        if (current.next) {
            current.next = current.next.next;
        }
        return dummy.next;
    }

    /** Find a node with a specific value */
    static find<T>(head: ListNode<T> | null, val: T): ListNode<T> | null {
        while (head) {
            if (head.val === val) return head;
            head = head.next;
        }
        return null;
    }

    /** Reverse a linked list */
    static reverse<T>(head: ListNode<T> | null): ListNode<T> | null {
        let prev: ListNode<T> | null = null;
        let current = head;
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    /** Append a node to the end */
    static append<T>(head: ListNode<T> | null, val: T): ListNode<T> | null {
        if (!head) return new ListNode(val);
        let current = head;
        while (current.next) {
            current = current.next;
        }
        current.next = new ListNode(val);
        return head;
    }

    /** Prepend a node to the beginning */
    static prepend<T>(head: ListNode<T> | null, val: T): ListNode<T> {
        const newNode = new ListNode(val);
        newNode.next = head;
        return newNode;
    }

    /** Clear the linked list */
    static clear<T>(head: ListNode<T> | null): ListNode<T> | null {
        while (head) {
            const temp = head.next;
            head.next = null;
            head = temp;
        }
        return null;
    }

    /** Check if the list has a cycle */
    static hasCycle<T>(head: ListNode<T> | null): boolean {
        let slow = head;
        let fast = head;
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
            if (slow === fast) return true;
        }
        return false;
    }

    /** Merge two sorted linked lists */
    static mergeTwoLists<T>(l1: ListNode<T> | null, l2: ListNode<T> | null): ListNode<T> | null {
        const dummy = new ListNode<T>(null as unknown as T);
        let current = dummy;

        while (l1 && l2) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        current.next = l1 ? l1 : l2;

        return dummy.next;
    }
}
