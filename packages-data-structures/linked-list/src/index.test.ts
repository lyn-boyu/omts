import { describe, expect, test } from "bun:test";
import { ListNode } from './index';

describe('ListNode', () => {
    /** Test for creating a linked list from an array */
    test('should create a linked list from an array', () => {
        const arr = [1, 2, 3, 4];
        const linkedList = ListNode.createFromArray(arr);
        expect(ListNode.toArray(linkedList)).toEqual(arr);
    });

    /** Test for converting a linked list back to an array */
    test('should convert a linked list to an array', () => {
        const arr = [10, 20, 30];
        const linkedList = ListNode.createFromArray(arr);
        expect(ListNode.toArray(linkedList)).toEqual(arr);
    });

    /** Test for getting the length of a linked list */
    test('should return the correct length of the linked list', () => {
        const linkedList = ListNode.createFromArray([5, 10, 15]);
        expect(ListNode.size(linkedList)).toBe(3);

        const emptyList = ListNode.createFromArray([]);
        expect(ListNode.size(emptyList)).toBe(0);
    });

    /** Test for inserting a node at a specific position */
    test('should insert a value at a specific position', () => {
        const linkedList = ListNode.createFromArray([1, 2, 3, 4]);
        const updatedList = ListNode.insertAt(linkedList, 2, 99);
        expect(ListNode.toArray(updatedList)).toEqual([1, 2, 99, 3, 4]);
    });

    /** Test for deleting a node at a specific position */
    test('should delete a node at a specific position', () => {
        const linkedList = ListNode.createFromArray([1, 2, 99, 3, 4]);
        const updatedList = ListNode.deleteAt(linkedList, 2);
        expect(ListNode.toArray(updatedList)).toEqual([1, 2, 3, 4]);
    });

    /** Test for finding a node by value */
    test('should find a node by value', () => {
        const linkedList = ListNode.createFromArray([1, 2, 3, 4]);
        const foundNode = ListNode.find(linkedList, 3);
        expect(foundNode?.val).toBe(3);
    });

    /** Test for reversing a linked list */
    test('should reverse a linked list', () => {
        const linkedList = ListNode.createFromArray([1, 2, 3, 4]);
        const reversedList = ListNode.reverse(linkedList);
        expect(ListNode.toArray(reversedList)).toEqual([4, 3, 2, 1]);
    });

    /** Test for appending a node to the linked list */
    test('should append a value to the linked list', () => {
        const linkedList = ListNode.createFromArray([1, 2, 3]);
        const updatedList = ListNode.append(linkedList, 4);
        expect(ListNode.toArray(updatedList)).toEqual([1, 2, 3, 4]);
    });

    /** Test for prepending a node to the linked list */
    test('should prepend a value to the linked list', () => {
        const linkedList = ListNode.createFromArray([2, 3, 4]);
        const updatedList = ListNode.prepend(linkedList, 1);
        expect(ListNode.toArray(updatedList)).toEqual([1, 2, 3, 4]);
    });

    /** Test for clearing the linked list */
    test('should clear the linked list', () => {
        const linkedList = ListNode.createFromArray([1, 2, 3]);
        const clearedList = ListNode.clear(linkedList);
        expect(ListNode.toArray(clearedList)).toEqual([]);
    });

    /** Test for detecting a cycle in the linked list (no cycle) */
    test('should return false if no cycle exists', () => {
        const linkedList = ListNode.createFromArray([1, 2, 3, 4]);
        expect(ListNode.hasCycle(linkedList)).toBe(false);
    });

    /** Test for detecting a cycle in the linked list (cycle exists) */
    test('should return true if a cycle exists', () => {
        const node1 = new ListNode(1);
        const node2 = new ListNode(2);
        const node3 = new ListNode(3);
        node1.next = node2;
        node2.next = node3;
        node3.next = node1; // creates a cycle

        expect(ListNode.hasCycle(node1)).toBe(true);
    });

    /** Test for merging two sorted linked lists */
    test('should merge two sorted linked lists', () => {
        const list1 = ListNode.createFromArray([1, 3, 5]);
        const list2 = ListNode.createFromArray([2, 4, 6]);
        const mergedList = ListNode.mergeTwoLists(list1, list2);
        expect(ListNode.toArray(mergedList)).toEqual([1, 2, 3, 4, 5, 6]);
    });
});
