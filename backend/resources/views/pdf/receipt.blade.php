<h2>University Receipt</h2>

<p>Student: {{ $payment->student->first_name }}</p>
<p>Semester: {{ $payment->semester->semester_name }}</p>

<hr>

<p>Amount Due: ${{ $payment->amount_due }}</p>
<p>Paid: ${{ $payment->amount_paid }}</p>
<p>Status: {{ $payment->payment_status }}</p>
<p>Reference: {{ $payment->transaction_reference }}</p>