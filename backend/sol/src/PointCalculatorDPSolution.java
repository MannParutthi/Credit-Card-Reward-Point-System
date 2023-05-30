import org.json.JSONObject;
import java.util.*;

// Dynamic Programming Solution 
// In this, rules have no listed priority, hence all the combinations to be considered to provide the best possible outcome to the customer
public class PointCalculatorDPSolution {

    static class Rule {
        Map<String, Integer> moneyToBeSpentPerMerchant;
        int pointsRewarded;

        public Rule(Map<String, Integer> moneyToBeSpentPerMerchant, int pointsRewarded) {
            this.moneyToBeSpentPerMerchant = moneyToBeSpentPerMerchant;
            this.pointsRewarded = pointsRewarded;
        }
    }

    final List<Rule> allApplicableRules;

    public PointCalculatorDPSolution() { // initialization of Rules in Constructor
        Map<String, Integer> rule1M = new HashMap<>();
        rule1M.put("TIM", 25);
        rule1M.put("SC", 75);
        Rule rule1 = new Rule(rule1M, 350);

        Map<String, Integer> rule2M = new HashMap<>();
        rule2M.put("SC", 75);
        Rule rule2 = new Rule(rule2M, 250);

        Map<String, Integer> rule3M = new HashMap<>();
        rule3M.put("TIM", 10);
        rule3M.put("SC", 25);
        Rule rule3 = new Rule(rule3M, 75);

        Map<String, Integer> rule4M = new HashMap<>();
        rule4M.put("SC", 20);
        Rule rule4 = new Rule(rule4M, 30);

        Map<String, Integer> rule5M = new HashMap<>();
        rule5M.put("ANY", 1);
        Rule rule5 = new Rule(rule5M, 1);

        allApplicableRules = new ArrayList<>();
        allApplicableRules.add(rule1);
        allApplicableRules.add(rule2);
        allApplicableRules.add(rule3);
        allApplicableRules.add(rule4);
        allApplicableRules.add(rule5);
    }

    int getApplicablePointsForRule(Rule rule, Map<String, Long> moneySpentByCustomer) {
        // see if this is a generic rule
        int points = 0;
        if(rule.moneyToBeSpentPerMerchant.keySet().size() == 1 && rule.moneyToBeSpentPerMerchant.containsKey("ANY")) {
            Integer DollarPerPoint = rule.moneyToBeSpentPerMerchant.get("ANY");
            // if so, anything in the moneySpent matches
            for(String merchantInTransaction : moneySpentByCustomer.keySet()) {
                long moneyInCents = moneySpentByCustomer.getOrDefault(merchantInTransaction, 0L);
                long moneyInDollars = moneyInCents / 100;
                points += moneyInDollars / DollarPerPoint;
                // update the rest of the money
                moneySpentByCustomer.put(merchantInTransaction, moneyInCents - (moneyInDollars * 100));
            }
            return points;
        }

        // check if all merchants needed for rule are satisfied
        for(String merchantRequiredByRule: rule.moneyToBeSpentPerMerchant.keySet()) {
            Integer minimumSpendNeeded = rule.moneyToBeSpentPerMerchant.get(merchantRequiredByRule);
            if(!(moneySpentByCustomer.containsKey(merchantRequiredByRule) 
                && moneySpentByCustomer.get(merchantRequiredByRule) >= minimumSpendNeeded)) {
                return -1;
                // rule not applicable
            }
        }

        // if we came till here, this means rule is applicable and lets subtract
        // moneyForPointsAwarded
        long minQty = Long.MAX_VALUE;
        for(String merchantRequiredByRule: rule.moneyToBeSpentPerMerchant.keySet()) {
            // check if money spent by customer is qualified
            Integer minimumSpendNeeded = rule.moneyToBeSpentPerMerchant.get(merchantRequiredByRule);
            Long moneySpentByCustomerForMerchantInCents = moneySpentByCustomer.get(merchantRequiredByRule);
            Long moneySpentByCustomerForMerchantInDollars = moneySpentByCustomerForMerchantInCents / 100;
            minQty = Math.round(Math.min(moneySpentByCustomerForMerchantInDollars / minimumSpendNeeded, minQty));
            // subtract the used by the points
        }

        if(minQty == 0) { return -1; }

        // subtract the money spent
        for(String merchantRequiredByRule : rule.moneyToBeSpentPerMerchant.keySet()) {
            // check if money spent by customer is qualified
            Integer minimumSpendNeeded = rule.moneyToBeSpentPerMerchant.get(merchantRequiredByRule);
            Long moneySpentByCustomerForMerchantInCents = moneySpentByCustomer.get(merchantRequiredByRule);
            if (minQty > 0) {
                long newMoneyLeftOverInTransaction = moneySpentByCustomerForMerchantInCents - (minQty * minimumSpendNeeded * 100);
                if(newMoneyLeftOverInTransaction < 0) {
                    System.out.println("Something went wrong - Unexpected, Debug !");
                }
                moneySpentByCustomer.put(merchantRequiredByRule, newMoneyLeftOverInTransaction);
            }
        }
        return (int) minQty * rule.pointsRewarded;
    }

    public long calculate(Map<String, Long> amountSpentPerMerchant) {
        Map<String, Long> amountMerchantMemo = new HashMap<>();
        return calculateMemoized2(amountSpentPerMerchant, amountMerchantMemo);
    }

    private long calculateMemoized2(Map<String, Long> amountSpentPerMerchant, Map<String, Long> memo) {
        // if each merchant spent remain is less than 1$, quit
        String memoKey = memoKey(amountSpentPerMerchant);
        if(memo.containsKey(memoKey)) {
            return memo.get(memoKey);
        }
        Collection<Long> values = amountSpentPerMerchant.values();
        // convert cents to dollars
        long max = values.stream().mapToLong(i -> i / 100).max().orElseThrow(NoSuchElementException::new);
        if(max < 1) {
            return 0;
        }
        long maxPoints = 0L;
        for(Rule rule : this.allApplicableRules) {
            long totalPoints = 0L;
            int applicablePointsForRule = getApplicablePointsForRule(rule, amountSpentPerMerchant);
            // if this rule is not applicable, calculate rest of the points by skipping this
            if(applicablePointsForRule != -1) {
                totalPoints = applicablePointsForRule + calculateMemoized2(new HashMap<>(amountSpentPerMerchant), memo);
            }
            maxPoints = Math.max(totalPoints, maxPoints);
        }
        memo.put(memoKey, maxPoints);
        return maxPoints;
    }

    public String memoKey(Map<String, Long> amountSpentPerMerchant) {
        return String.format("TIM %s SC %s SUBWAY %s OTHER %s", 
            amountSpentPerMerchant.getOrDefault("TIM", 0L), 
            amountSpentPerMerchant.getOrDefault("SC", 0L), 
            amountSpentPerMerchant.getOrDefault("SUBWAY", 0L), 
            amountSpentPerMerchant.getOrDefault("OTHER", 0L)); 
    }

    // parsing logic would need to change if new data is introduced
    public Map<String, Long> parseTransactions(String transaction_data) {
        JSONObject obj = new JSONObject(transaction_data);
        Map<String, Long> moneySpentPerMerchant = new HashMap<>();
        for(String key : obj.keySet()) {
            String merchant_code = (String) obj.getJSONObject(key).get("merchant_code");
            long amount_cents = (Integer) obj.getJSONObject(key).get("amount_cents");
            moneySpentPerMerchant.put(merchant_code, moneySpentPerMerchant.getOrDefault(merchant_code, 0L) + amount_cents);
        }
        // change the names of merchants
        Long sportcheck = moneySpentPerMerchant.get("sportcheck");
        moneySpentPerMerchant.remove("sportcheck");
        Long subway = moneySpentPerMerchant.get("subway");
        moneySpentPerMerchant.remove("subway");
        Long timhortons = moneySpentPerMerchant.get("tim_hortons");
        moneySpentPerMerchant.remove("tim_hortons");
        Long other = 0L;
        for(String key : moneySpentPerMerchant.keySet()) {
            other += moneySpentPerMerchant.getOrDefault(key, 0L);
        }

        moneySpentPerMerchant.put("SC", sportcheck);
        moneySpentPerMerchant.put("TIM", timhortons);
        moneySpentPerMerchant.put("OTHER", subway + other);
        System.out.println("Money Spent Per Merchant After Parsing & Merging all Transactions => " + moneySpentPerMerchant);
        return moneySpentPerMerchant;
    }

    public static void main(String[] args) {
        String transaction_data = 
            "{\n" +
                " \"T01\": {\"date\": \"2021-05-01\", \"merchant_code\": \"sportcheck\", \"amount_cents\": 21000},\n" +
                " \"T02\": {\"date\": \"2021-05-02\", \"merchant_code\": \"sportcheck\", \"amount_cents\": 8700},\n" +
                " \"T03\": {\"date\": \"2021-05-03\", \"merchant_code\": \"tim_hortons\", \"amount_cents\": 323},\n" +
                " \"T04\": {\"date\": \"2021-05-04\", \"merchant_code\": \"tim_hortons\", \"amount_cents\": 1267},\n" +
                " \"T05\": {\"date\": \"2021-05-05\", \"merchant_code\": \"tim_hortons\", \"amount_cents\": 2116},\n" +
                " \"T06\": {\"date\": \"2021-05-06\", \"merchant_code\": \"tim_hortons\", \"amount_cents\": 2211},\n" +
                " \"T07\": {\"date\": \"2021-05-07\", \"merchant_code\": \"subway\", \"amount_cents\": 1853},\n" +
                " \"T08\": {\"date\": \"2021-05-08\", \"merchant_code\": \"subway\", \"amount_cents\": 2153},\n" +
                " \"T09\": {\"date\": \"2021-05-09\", \"merchant_code\": \"sportcheck\", \"amount_cents\": 7326},\n" +
                " \"T10\": {\"date\": \"2021-05-10\", \"merchant_code\": \"tim_hortons\", \"amount_cents\": 1321},\n" +
            "}";
        
        PointCalculatorDPSolution pointCalculator = new PointCalculatorDPSolution();
        Map<String, Long> moneySpentPerMerchant = pointCalculator.parseTransactions(transaction_data);
        System.out.println("Reward Points => " + pointCalculator.calculate(moneySpentPerMerchant));
    }
}