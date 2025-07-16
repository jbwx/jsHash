

# jsHash v0.3

Non-asynchronous hash function in Javascript.

### Details

Takes an object of any size, and returns a pseudorandom 8-digit base62 string. 

### Usage

Vanilla Javascript

```HTML
<script src="https://jbwx.github.io/jsHash/jsHash.js"></script>
<script>
      console.log(hash("Hello, world!"));
</script>
```

Node

```javascript
const hash = require('./jsHash.js');
console.log(hash("Hello, world!"));
```
    
### What's new?

Happy to announce some major improvements to the previous iteration! 

The output domain has been changed. The output is now 8 characters of base62. A-Z, a-z, and 0-9. 62 characters total. 62^8 = ~218 trillion possibilities. 

The output domain is much smaller than the previous, 16-byte hex output. If you notice, the characters are all URL-compatible. I'm trying to tailor this for a practical purpose – an IDing system for an enterprise application.

I've released an Integrity analysis. This has helped me iterate and improve the function a lot!

You can replicate the results below for yourself using [this](https://jbwx.github.io/jsHash/hashTestSuite.js) (hashTestSuite.js).

## Integrity Analysis

### Character Frequency (Total and Positional)

This analysis combines total character frequency with positional frequency.

-   **Total Frequency:** 804,808 characters were analyzed. A good hash function should show all total counts close to the expected value of ~12,980.77.
-   **Positional Frequency:** 100,601 hashes were analyzed. This shows character counts for each of the 8 output positions. The expected count per character at each position is ~1,622.60.

| Character | Pos 0 | Pos 1 | Pos 2 | Pos 3 | Pos 4 | Pos 5 | Pos 6 | Pos 7 | **Total** |
|:---:|---:|---:|---:|---:|---:|---:|---:|---:|:---:|
| 0 | 1637 | 1601 | 1573 | 1638 | 1609 | 1567 | 1623 | 1583 | **12831** |
| 1 | 1614 | 1577 | 1638 | 1615 | 1620 | 1623 | 1673 | 1610 | **12970** |
| 2 | 1618 | 1615 | 1630 | 1527 | 1558 | 1573 | 1567 | 1616 | **12704** |
| 3 | 1578 | 1698 | 1625 | 1651 | 1621 | 1668 | 1654 | 1619 | **13114** |
| 4 | 1544 | 1623 | 1697 | 1595 | 1637 | 1656 | 1650 | 1668 | **13070** |
| 5 | 1634 | 1599 | 1598 | 1613 | 1609 | 1599 | 1614 | 1588 | **12854** |
| 6 | 1595 | 1555 | 1616 | 1640 | 1656 | 1576 | 1607 | 1665 | **12910** |
| 7 | 1594 | 1592 | 1620 | 1650 | 1637 | 1584 | 1576 | 1604 | **12857** |
| 8 | 1614 | 1645 | 1560 | 1623 | 1587 | 1651 | 1685 | 1632 | **12997** |
| 9 | 1549 | 1620 | 1698 | 1618 | 1671 | 1631 | 1629 | 1594 | **13010** |
| A | 1644 | 1673 | 1678 | 1657 | 1684 | 1597 | 1639 | 1623 | **13195** |
| B | 1573 | 1684 | 1629 | 1657 | 1641 | 1661 | 1620 | 1627 | **13092** |
| C | 1589 | 1581 | 1602 | 1594 | 1650 | 1618 | 1608 | 1615 | **12857** |
| D | 1660 | 1603 | 1567 | 1602 | 1615 | 1610 | 1559 | 1544 | **12760** |
| E | 1591 | 1710 | 1552 | 1582 | 1628 | 1665 | 1615 | 1637 | **12980** |
| F | 1671 | 1607 | 1722 | 1635 | 1629 | 1626 | 1581 | 1641 | **13112** |
| G | 1683 | 1612 | 1659 | 1578 | 1569 | 1658 | 1587 | 1619 | **12965** |
| H | 1642 | 1624 | 1556 | 1583 | 1601 | 1647 | 1601 | 1675 | **12929** |
| I | 1654 | 1637 | 1603 | 1631 | 1628 | 1575 | 1591 | 1644 | **12963** |
| J | 1645 | 1591 | 1704 | 1563 | 1509 | 1709 | 1631 | 1548 | **12900** |
| K | 1618 | 1668 | 1617 | 1614 | 1573 | 1607 | 1642 | 1649 | **12988** |
| L | 1613 | 1651 | 1559 | 1579 | 1643 | 1582 | 1646 | 1656 | **12929** |
| M | 1646 | 1630 | 1578 | 1662 | 1683 | 1717 | 1580 | 1636 | **13132** |
| N | 1581 | 1575 | 1611 | 1660 | 1609 | 1677 | 1631 | 1672 | **13016** |
| O | 1579 | 1532 | 1570 | 1599 | 1574 | 1670 | 1684 | 1620 | **12828** |
| P | 1655 | 1620 | 1662 | 1657 | 1615 | 1663 | 1626 | 1654 | **13152** |
| Q | 1589 | 1627 | 1636 | 1734 | 1638 | 1604 | 1645 | 1575 | **13048** |
| R | 1683 | 1709 | 1652 | 1651 | 1610 | 1587 | 1669 | 1542 | **13103** |
| S | 1664 | 1602 | 1613 | 1650 | 1628 | 1598 | 1597 | 1719 | **13071** |
| T | 1643 | 1574 | 1645 | 1609 | 1630 | 1664 | 1657 | 1584 | **13006** |
| U | 1567 | 1635 | 1581 | 1672 | 1599 | 1669 | 1545 | 1627 | **12895** |
| V | 1651 | 1725 | 1651 | 1623 | 1607 | 1579 | 1657 | 1650 | **13143** |
| W | 1689 | 1711 | 1581 | 1620 | 1644 | 1612 | 1624 | 1625 | **13106** |
| X | 1674 | 1600 | 1624 | 1635 | 1587 | 1621 | 1692 | 1620 | **13053** |
| Y | 1626 | 1672 | 1555 | 1627 | 1608 | 1636 | 1716 | 1611 | **13051** |
| Z | 1566 | 1633 | 1574 | 1636 | 1647 | 1610 | 1590 | 1590 | **12846** |
| a | 1597 | 1589 | 1692 | 1600 | 1633 | 1608 | 1617 | 1632 | **12968** |
| b | 1618 | 1563 | 1679 | 1579 | 1669 | 1568 | 1611 | 1611 | **12898** |
| c | 1672 | 1726 | 1599 | 1677 | 1695 | 1664 | 1685 | 1640 | **13358** |
| d | 1616 | 1653 | 1628 | 1620 | 1676 | 1678 | 1622 | 1584 | **13077** |
| e | 1625 | 1638 | 1652 | 1610 | 1635 | 1619 | 1679 | 1650 | **13108** |
| f | 1656 | 1607 | 1564 | 1617 | 1654 | 1574 | 1630 | 1549 | **12851** |
| g | 1606 | 1635 | 1594 | 1637 | 1662 | 1639 | 1570 | 1622 | **12965** |
| h | 1581 | 1549 | 1660 | 1646 | 1557 | 1593 | 1569 | 1650 | **12805** |
| i | 1612 | 1644 | 1670 | 1596 | 1601 | 1667 | 1568 | 1586 | **12944** |
| j | 1536 | 1611 | 1655 | 1609 | 1659 | 1572 | 1596 | 1688 | **12926** |
| k | 1693 | 1574 | 1625 | 1617 | 1628 | 1625 | 1642 | 1645 | **13049** |
| l | 1641 | 1571 | 1543 | 1590 | 1593 | 1648 | 1626 | 1580 | **12792** |
| m | 1641 | 1627 | 1646 | 1613 | 1683 | 1575 | 1591 | 1600 | **12976** |
| n | 1633 | 1584 | 1637 | 1695 | 1561 | 1685 | 1626 | 1686 | **13107** |
| o | 1612 | 1585 | 1603 | 1591 | 1585 | 1598 | 1582 | 1611 | **12767** |
| p | 1634 | 1599 | 1591 | 1576 | 1603 | 1605 | 1657 | 1682 | **12947** |
| q | 1594 | 1648 | 1582 | 1647 | 1635 | 1667 | 1618 | 1551 | **12942** |
| r | 1631 | 1646 | 1709 | 1601 | 1554 | 1638 | 1664 | 1631 | **13074** |
| s | 1568 | 1582 | 1600 | 1609 | 1685 | 1569 | 1635 | 1584 | **12832** |
| t | 1631 | 1538 | 1625 | 1599 | 1604 | 1622 | 1577 | 1669 | **12865** |
| u | 1593 | 1659 | 1622 | 1568 | 1672 | 1585 | 1579 | 1601 | **12879** |
| v | 1622 | 1629 | 1623 | 1611 | 1599 | 1639 | 1627 | 1654 | **13004** |
| w | 1619 | 1635 | 1665 | 1633 | 1637 | 1592 | 1594 | 1657 | **13032** |
| x | 1640 | 1685 | 1644 | 1617 | 1643 | 1629 | 1636 | 1629 | **13123** |
| y | 1713 | 1608 | 1584 | 1630 | 1623 | 1581 | 1640 | 1609 | **12988** |
| z | 1644 | 1605 | 1673 | 1733 | 1601 | 1571 | 1649 | 1618 | **13094** |

<br>

## 2. Common Substring Analysis

This test looks for repeating patterns inside the hashes. The score is calculated as `(Substring Length) * (Number of Occurrences)`. A good hash function should produce very few, low-scoring patterns.

| Substring | Count | Score |
|:---|---:|---:|
| 'VB' | 225 | 450 |
| 'RB' | 224 | 448 |
| 'Vy' | 223 | 446 |
| 'wQ' | 223 | 446 |
| 'RZ' | 222 | 444 |
| 'dA' | 222 | 444 |
| '1W' | 222 | 444 |
| 'tA' | 221 | 442 |
| 'xm' | 220 | 440 |
| 'Hy' | 220 | 440 |
| 'xI' | 220 | 440 |
| 'mK' | 220 | 440 |
| 'IN' | 220 | 440 |
| 'Tj' | 220 | 440 |
| 'nF' | 219 | 438 |
| 'eL' | 218 | 436 |
| 'Bg' | 218 | 436 |
| 'NF' | 218 | 436 |
| 'Ux' | 217 | 434 |
| 'Z6' | 217 | 434 |

Good that there isn't a string longer than two characters, but suspicious that the two highest strings both end with "B".

  **Collision probability**

Since the output is an 8-character string from a 62-character set, the total number of possible hashes is 62^8, or 218 trillion. This is equivalent to a **~48-bit hash** (log₂(62⁸) ≈ 47.6 bits).

Due to the [Birthday Problem](https://en.wikipedia.org/wiki/Birthday_problem), you can expect a 50% chance of a collision after hashing only `sqrt(62⁸)` ≈ 14.8 million items. 

Out of curiosity, I decided to actually test 15 million hashes. The results were quite promising – I did not find a collision.

---

As mentioned, this shouldn't be used for any cryptographic purpose. A full, professional cryptanalysis would likely reveal some vulnerabilities – so the previous disclaimer still applies.

> This is not proven in any way to be mathematically sound. There is no guarantee that all outputs are equally likely, or that every output is possible. The output appears to be random from the limited tests I’ve done, although it’s unlikely there isn’t some sort of underlying pattern. Do not use this in any security-critical application.
