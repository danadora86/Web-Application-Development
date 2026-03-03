function calculateGrade(percentage: number): string | null{
    if(percentage < 0 || percentage > 100) return null;

    if(percentage >=70 && percentage <=100) return "A";
    if(percentage >=60 && percentage <=69) return "B";
    if(percentage >=50 && percentage <=59) return "C";
    if(percentage >=40 && percentage <=49) return "D";
    return "F";
    
}

console.log(calculateGrade(85));
console.log(calculateGrade(61));
console.log(calculateGrade(55));
console.log(calculateGrade(44));
console.log(calculateGrade(-2));
