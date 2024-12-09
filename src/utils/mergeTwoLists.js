class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

const mergeTwoLists = (list1, list2) => {
  const result = new ListNode(0);
  let curent = result;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      curent.next = list1;
      list1 = list1.next;
    } else {
      curent.next = list2;
      list2 = list2.next;
    }
    curent = curent.next;
  }

  if (list1) {
    curent.next = list1;
  } else if (list2) {
    curent.next = list2;
  }

  return result.next;
};
